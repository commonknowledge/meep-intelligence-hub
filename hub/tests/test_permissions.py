from django.contrib.gis.geos import Point
from django.test import Client, TestCase, override_settings
from django.urls import reverse

from hub import models
from utils import geo


class Setup:
    def setUp(self) -> None:
        self.client = Client()
        # Create user
        self.user = models.User.objects.create_user(
            username="testuser", password="12345"
        )
        # Create org for user
        self.org = models.Organisation.objects.create(name="testorg", slug="testorg")
        self.membership = models.Membership.objects.create(
            user=self.user, organisation=self.org, role="owner"
        )
        # Create source
        self.source = models.ExternalDataSource.objects.create(
            name="testsource", organisation=self.org
        )
        # Some dummy data
        ds = models.DataSet.objects.create(name="xyz", external_data_source=self.source)
        dt = models.DataType.objects.create(name="xyz", data_set=ds)
        self.generic_data = models.GenericData.objects.create(
            data="xyz",
            email="xyz@bbc.com",
            json={"some": "thing"},
            point=Point(x=0, y=0, srid=4326),
            postcode_data={
                "european_electoral_region": "XXX",
                "codes": {
                    "european_electoral_region": "XXX",
                },
            },
            data_type=dt,
        )
        # Make a dummy region
        area_type = models.AreaType.objects.create(
            name="2018 European Electoral Regions",
            code="EER",
            area_type="European Electoral Region",
            description="European Electoral Region boundaries, as at December 2018",
        )
        models.Area.objects.create(
            mapit_id="XXX",
            gss="XXX",
            name="Fake area",
            area_type=area_type,
        )
        # Create report
        self.report = models.MapReport.objects.create(
            name="testreport",
            organisation=self.org,
            layers=[
                models.MapReport.MapLayer(
                    id="testlayer",
                    name="testlayer",
                    source=str(self.source.id),
                    visible=True,
                )
            ],
        )


@override_settings(ALLOWED_HOSTS=["testserver"])
class TestOwnSources(Setup, TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.client.login(username="testuser", password="12345")
        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "variables": {"username": "testuser", "password": "12345"},
                "query": """
                  mutation Login($username: String!, $password: String!) {
                    tokenAuth(username: $username, password: $password) {
                      errors
                      success
                      token {
                        token
                      }
                    }
                  }
              """,
            },
        )
        self.assertIn(res.status_code, [200, 204])
        self.token = res.json()["data"]["tokenAuth"]["token"]["token"]

    def test_permissions_calculator(self):
        permissions = models.ExternalDataSource.user_permissions(self.user, self.source)
        self.assertDictEqual(
            permissions, {"can_display_points": True, "can_display_details": True}
        )

    # Test graphQL query for aggregates
    def test_aggregate_data_count(self):
        query = """
            query MapReportLayerGeoJSONPoint($sourceId: ID!) {
              sharedDataSource(pk: $sourceId) {
                id
                importedDataCountByRegion {
                  gss
                  count
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={"query": query, "variables": {"sourceId": str(self.source.id)}},
            headers={
                "Authorization": f"JWT {self.token}",
            },
        )
        result = res.json()

        self.assertIsNone(result.get("errors", None))
        self.assertEqual(
            [{"gss": "XXX", "count": 1}],
            result["data"]["sharedDataSource"]["importedDataCountByRegion"],
        )

    # Test graphQL query for geojson point
    def test_generic_data_visibility(self):
        query = """
            query MapReportLayerGeoJSONPoint($genericDataId: String!) {
              importedDataGeojsonPoint(genericDataId: $genericDataId) {
                id
                geometry {
                  coordinates
                }
                properties {
                  id
                  email
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "query": query,
                "variables": {"genericDataId": str(self.generic_data.id)},
            },
            headers={"Authorization": f"JWT {self.token}"},
        )
        result = res.json()

        self.assertIsNone(result.get("errors", None))
        self.assertDictEqual(
            result["data"]["importedDataGeojsonPoint"],
            {
                "id": str(self.generic_data.id),
                "geometry": {"coordinates": [0.0, 0.0]},
                "properties": {"id": str(self.generic_data.id), "email": "xyz@bbc.com"},
            },
        )

    # Test tileserver query for vector tiles
    def test_vector_tiles_visibility(self):
        zoom = 13
        kwargs = {
            "pk": str(self.source.id),
            "z": zoom,
            "x": geo.lon2tile(self.generic_data.point.x, zoom),
            "y": geo.lat2tile(self.generic_data.point.y, zoom),
        }
        res = self.client.get(
            reverse(
                "external_data_source_point_tile",
                kwargs=kwargs,
            ),
            headers={"Authorization": f"JWT {self.token}"},
        )
        self.assertIn(res.status_code, [200, 204])
        self.assertEqual(res["Content-Type"], "application/vnd.mapbox-vector-tile")
        self.assertIsNotNone(res.content)


@override_settings(ALLOWED_HOSTS=["testserver"])
class TestFullSharing(Setup, TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.other_user = models.User.objects.create_user(
            username="otheruser", password="12345"
        )
        self.other_org = models.Organisation.objects.create(
            name="otherorg", slug="otherorg"
        )
        models.Membership.objects.create(
            user=self.other_user, organisation=self.other_org, role="owner"
        )
        self.sharing = models.SharingPermission.objects.create(
            external_data_source=self.source,
            organisation=self.other_org,
            visibility_record_coordinates=True,
            visibility_record_details=True,
        )
        self.client.login(username="otheruser", password="12345")
        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "variables": {"username": "otheruser", "password": "12345"},
                "query": """
            mutation Login($username: String!, $password: String!) {
              tokenAuth(username: $username, password: $password) {
                errors
                success
                token {
                  token
                }
              }
            }
            """,
            },
            headers={},
        )
        self.token = res.json()["data"]["tokenAuth"]["token"]["token"]

    def test_permissions_calculator(self):
        permissions = models.ExternalDataSource.user_permissions(
            self.other_user, self.source
        )
        self.assertDictEqual(
            permissions, {"can_display_points": True, "can_display_details": True}
        )

    def test_aggregate_data_count(self):
        query = """
            query MapReportLayerGeoJSONPoint($sourceId: ID!) {
              sharedDataSource(pk: $sourceId) {
                id
                importedDataCountByRegion {
                  gss
                  count
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={"query": query, "variables": {"sourceId": str(self.source.id)}},
            headers={
                "Authorization": f"JWT {self.token}",
            },
        )
        result = res.json()

        self.assertIsNone(result.get("errors", None))
        self.assertEqual(
            [{"gss": "XXX", "count": 1}],
            result["data"]["sharedDataSource"]["importedDataCountByRegion"],
        )

    def test_generic_data_visibility(self):
        query = """
            query MapReportLayerGeoJSONPoint($genericDataId: String!) {
              importedDataGeojsonPoint(genericDataId: $genericDataId) {
                id
                geometry {
                  coordinates
                }
                properties {
                  id
                  email
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "query": query,
                "variables": {"genericDataId": str(self.generic_data.id)},
            },
            headers={"Authorization": f"JWT {self.token}"},
        )
        result = res.json()

        self.assertIsNone(result.get("errors", None))
        self.assertDictEqual(
            result["data"]["importedDataGeojsonPoint"],
            {
                "id": str(self.generic_data.id),
                "geometry": {"coordinates": [0.0, 0.0]},
                "properties": {"id": str(self.generic_data.id), "email": "xyz@bbc.com"},
            },
        )

    def test_vector_tiles_visibility(self):
        zoom = 13
        kwargs = {
            "pk": str(self.source.id),
            "z": zoom,
            "x": geo.lon2tile(self.generic_data.point.x, zoom),
            "y": geo.lat2tile(self.generic_data.point.y, zoom),
        }
        res = self.client.get(
            reverse(
                "external_data_source_point_tile",
                kwargs=kwargs,
            ),
            headers={"Authorization": f"JWT {self.token}"},
        )
        self.assertIn(res.status_code, [200, 204])
        self.assertEqual(res["Content-Type"], "application/vnd.mapbox-vector-tile")
        self.assertIsNotNone(res.content)


@override_settings(ALLOWED_HOSTS=["testserver"])
class TestLocationOnlySharing(Setup, TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.other_user = models.User.objects.create_user(
            username="otheruser", password="12345"
        )
        self.other_org = models.Organisation.objects.create(
            name="otherorg", slug="otherorg"
        )
        models.Membership.objects.create(
            user=self.other_user, organisation=self.other_org, role="owner"
        )
        self.sharing = models.SharingPermission.objects.create(
            external_data_source=self.source,
            organisation=self.other_org,
            visibility_record_coordinates=True,
            visibility_record_details=False,
        )
        self.client.login(username="otheruser", password="12345")
        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "variables": {"username": "otheruser", "password": "12345"},
                "query": """
            mutation Login($username: String!, $password: String!) {
              tokenAuth(username: $username, password: $password) {
                errors
                success
                token {
                  token
                }
              }
            }
            """,
            },
            headers={},
        )
        self.token = res.json()["data"]["tokenAuth"]["token"]["token"]

    def test_permissions_calculator(self):
        permissions = models.ExternalDataSource.user_permissions(
            self.other_user, self.source
        )
        self.assertDictEqual(
            permissions, {"can_display_points": True, "can_display_details": False}
        )

    def test_aggregate_data_count(self):
        query = """
            query MapReportLayerGeoJSONPoint($sourceId: ID!) {
              sharedDataSource(pk: $sourceId) {
                id
                importedDataCountByRegion {
                  gss
                  count
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={"query": query, "variables": {"sourceId": str(self.source.id)}},
            headers={
                "Authorization": f"JWT {self.token}",
            },
        )
        result = res.json()

        self.assertIsNone(result.get("errors", None))
        self.assertEqual(
            [{"gss": "XXX", "count": 1}],
            result["data"]["sharedDataSource"]["importedDataCountByRegion"],
        )

    def test_vector_tiles_visibility(self):
        zoom = 13
        kwargs = {
            "pk": str(self.source.id),
            "z": zoom,
            "x": geo.lon2tile(self.generic_data.point.x, zoom),
            "y": geo.lat2tile(self.generic_data.point.y, zoom),
        }
        res = self.client.get(
            reverse(
                "external_data_source_point_tile",
                kwargs=kwargs,
            ),
            headers={"Authorization": f"JWT {self.token}"},
        )
        self.assertIn(res.status_code, [200, 204])
        self.assertEqual(res["Content-Type"], "application/vnd.mapbox-vector-tile")
        self.assertIsNotNone(res.content)

    def test_generic_data_visibility(self):
        query = """
            query MapReportLayerGeoJSONPoint($genericDataId: String!) {
              importedDataGeojsonPoint(genericDataId: $genericDataId) {
                id
                geometry {
                  coordinates
                }
                properties {
                  id
                  email
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "query": query,
                "variables": {"genericDataId": str(self.generic_data.id)},
            },
            headers={
                "Authorization": f"JWT {self.token}",
            },
        )
        result = res.json()

        self.assertIsNotNone(
            result["data"]["importedDataGeojsonPoint"]["geometry"]["coordinates"]
        )
        self.assertIsNone(result["data"]["importedDataGeojsonPoint"]["properties"])


@override_settings(ALLOWED_HOSTS=["testserver"])
class TestAggregateOnlySharing(Setup, TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.other_user = models.User.objects.create_user(
            username="otheruser", password="12345"
        )
        self.other_org = models.Organisation.objects.create(
            name="otherorg", slug="otherorg"
        )
        models.Membership.objects.create(
            user=self.other_user, organisation=self.other_org, role="owner"
        )
        self.sharing = models.SharingPermission.objects.create(
            external_data_source=self.source,
            organisation=self.other_org,
            visibility_record_coordinates=False,
            visibility_record_details=False,
        )
        self.client.login(username="otheruser", password="12345")
        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "variables": {"username": "otheruser", "password": "12345"},
                "query": """
            mutation Login($username: String!, $password: String!) {
              tokenAuth(username: $username, password: $password) {
                errors
                success
                token {
                  token
                }
              }
            }
            """,
            },
            headers={},
        )
        self.token = res.json()["data"]["tokenAuth"]["token"]["token"]

    def test_permissions_calculator(self):
        permissions = models.ExternalDataSource.user_permissions(
            self.other_user, self.source
        )
        self.assertDictEqual(
            permissions, {"can_display_points": False, "can_display_details": False}
        )

    def test_aggregate_data_count(self):
        query = """
            query MapReportLayerGeoJSONPoint($sourceId: ID!) {
              sharedDataSource(pk: $sourceId) {
                id
                importedDataCountByRegion {
                  gss
                  count
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={"query": query, "variables": {"sourceId": str(self.source.id)}},
            headers={
                "Authorization": f"JWT {self.token}",
            },
        )
        result = res.json()

        self.assertIsNone(result.get("errors", None))
        self.assertEqual(
            [{"gss": "XXX", "count": 1}],
            result["data"]["sharedDataSource"]["importedDataCountByRegion"],
        )

    def test_vector_tiles_visibility(self):
        zoom = 13
        kwargs = {
            "pk": str(self.source.id),
            "z": zoom,
            "x": geo.lon2tile(self.generic_data.point.x, zoom),
            "y": geo.lat2tile(self.generic_data.point.y, zoom),
        }
        res = self.client.get(
            reverse(
                "external_data_source_point_tile",
                kwargs=kwargs,
            ),
            headers={"Authorization": f"JWT {self.token}"},
        )
        self.assertEqual(res.status_code, 403)
        self.assertNotEqual(res["Content-Type"], "application/vnd.mapbox-vector-tile")

    def test_generic_data_visibility(self):
        query = """
            query MapReportLayerGeoJSONPoint($genericDataId: String!) {
              importedDataGeojsonPoint(genericDataId: $genericDataId) {
                id
                geometry {
                  coordinates
                }
                properties {
                  id
                  email
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "query": query,
                "variables": {"genericDataId": str(self.generic_data.id)},
            },
            headers={},
        )
        result = res.json()

        self.assertIsNone(result["data"]["importedDataGeojsonPoint"])


@override_settings(ALLOWED_HOSTS=["testserver"])
class TestNoSharing(Setup, TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.other_user = models.User.objects.create_user(
            username="otheruser", password="12345"
        )
        self.other_org = models.Organisation.objects.create(
            name="otherorg", slug="otherorg"
        )
        models.Membership.objects.create(
            user=self.other_user, organisation=self.other_org, role="owner"
        )
        self.client.login(username="otheruser", password="12345")
        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "variables": {"username": "otheruser", "password": "12345"},
                "query": """
            mutation Login($username: String!, $password: String!) {
              tokenAuth(username: $username, password: $password) {
                errors
                success
                token {
                  token
                }
              }
            }
            """,
            },
            headers={},
        )
        self.token = res.json()["data"]["tokenAuth"]["token"]["token"]

    def test_permissions_calculator(self):
        permissions = models.ExternalDataSource.user_permissions(
            self.other_user, self.source
        )
        self.assertDictEqual(
            permissions, {"can_display_points": False, "can_display_details": False}
        )

    def test_aggregate_data_count(self):
        query = """
            query MapReportLayerGeoJSONPoint($sourceId: ID!) {
              sharedDataSource(pk: $sourceId) {
                id
                importedDataCountByRegion {
                  gss
                  count
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={"query": query, "variables": {"sourceId": str(self.source.id)}},
            headers={"Authorization": f"JWT {self.token}"},
        )
        result = res.json()

        self.assertIsNotNone(result.get("errors", None))
        self.assertIsNone(result.get("data", None))

    def test_vector_tiles_visibility(self):
        zoom = 13
        kwargs = {
            "pk": str(self.source.id),
            "z": zoom,
            "x": geo.lon2tile(self.generic_data.point.x, zoom),
            "y": geo.lat2tile(self.generic_data.point.y, zoom),
        }
        res = self.client.get(
            reverse(
                "external_data_source_point_tile",
                kwargs=kwargs,
            ),
            headers={"Authorization": f"JWT {self.token}"},
        )
        self.assertEqual(res.status_code, 403)
        self.assertNotEqual(res["Content-Type"], "application/vnd.mapbox-vector-tile")

    def test_generic_data_visibility(self):
        query = """
            query MapReportLayerGeoJSONPoint($genericDataId: String!) {
              importedDataGeojsonPoint(genericDataId: $genericDataId) {
                id
                geometry {
                  coordinates
                }
                properties {
                  id
                  email
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "query": query,
                "variables": {"genericDataId": str(self.generic_data.id)},
            },
            headers={
                "Authorization": f"JWT {self.token}",
            },
        )
        result = res.json()

        self.assertIsNone(result["data"]["importedDataGeojsonPoint"])


@override_settings(ALLOWED_HOSTS=["testserver"])
class TestLoggedOutUserForUnsharedSource(Setup, TestCase):
    def setUp(self) -> None:
        super().setUp()

    def test_permissions_calculator(self):
        permissions = models.ExternalDataSource.user_permissions(None, self.source)
        self.assertDictEqual(
            permissions, {"can_display_points": False, "can_display_details": False}
        )

    def test_aggregate_data_count(self):
        query = """
            query MapReportLayerGeoJSONPoint($sourceId: ID!) {
              sharedDataSource(pk: $sourceId) {
                id
                importedDataCountByRegion {
                  gss
                  count
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={"query": query, "variables": {"sourceId": str(self.source.id)}},
        )
        result = res.json()

        self.assertIsNotNone(result.get("errors", None))
        self.assertIsNone(result.get("data", None))

    def test_vector_tiles_visibility(self):
        zoom = 13
        kwargs = {
            "pk": str(self.source.id),
            "z": zoom,
            "x": geo.lon2tile(self.generic_data.point.x, zoom),
            "y": geo.lat2tile(self.generic_data.point.y, zoom),
        }
        res = self.client.get(
            reverse(
                "external_data_source_point_tile",
                kwargs=kwargs,
            )
        )
        self.assertEqual(res.status_code, 403)
        self.assertNotEqual(res["Content-Type"], "application/vnd.mapbox-vector-tile")

    def test_generic_data_visibility(self):
        query = """
            query MapReportLayerGeoJSONPoint($genericDataId: String!) {
              importedDataGeojsonPoint(genericDataId: $genericDataId) {
                id
                geometry {
                  coordinates
                }
                properties {
                  id
                  email
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "query": query,
                "variables": {"genericDataId": str(self.generic_data.id)},
            },
        )
        result = res.json()

        self.assertIsNone(result["data"]["importedDataGeojsonPoint"])


@override_settings(ALLOWED_HOSTS=["testserver"])
class TestLoggedOutUserForSharedSource(Setup, TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.other_user = models.User.objects.create_user(
            username="otheruser", password="12345"
        )
        self.other_org = models.Organisation.objects.create(
            name="otherorg", slug="otherorg"
        )
        models.Membership.objects.create(
            user=self.other_user, organisation=self.other_org, role="owner"
        )
        self.sharing = models.SharingPermission.objects.create(
            external_data_source=self.source,
            organisation=self.other_org,
            visibility_record_coordinates=True,
            visibility_record_details=True,
        )

    def test_permissions_calculator(self):
        permissions = models.ExternalDataSource.user_permissions(None, self.source)
        self.assertDictEqual(
            permissions, {"can_display_points": False, "can_display_details": False}
        )

    def test_aggregate_data_count(self):
        query = """
            query MapReportLayerGeoJSONPoint($sourceId: ID!) {
              sharedDataSource(pk: $sourceId) {
                id
                importedDataCountByRegion {
                  gss
                  count
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={"query": query, "variables": {"sourceId": str(self.source.id)}},
        )
        result = res.json()

        self.assertIsNotNone(result.get("errors", None))
        self.assertIsNone(result.get("data", None))

    def test_vector_tiles_visibility(self):
        zoom = 13
        kwargs = {
            "pk": str(self.source.id),
            "z": zoom,
            "x": geo.lon2tile(self.generic_data.point.x, zoom),
            "y": geo.lat2tile(self.generic_data.point.y, zoom),
        }
        res = self.client.get(
            reverse(
                "external_data_source_point_tile",
                kwargs=kwargs,
            )
        )
        self.assertEqual(res.status_code, 403)
        self.assertNotEqual(res["Content-Type"], "application/vnd.mapbox-vector-tile")

    def test_generic_data_visibility(self):
        query = """
            query MapReportLayerGeoJSONPoint($genericDataId: String!) {
              importedDataGeojsonPoint(genericDataId: $genericDataId) {
                id
                geometry {
                  coordinates
                }
                properties {
                  id
                  email
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "query": query,
                "variables": {"genericDataId": str(self.generic_data.id)},
            },
        )
        result = res.json()

        self.assertIsNone(result["data"]["importedDataGeojsonPoint"])


@override_settings(ALLOWED_HOSTS=["testserver"])
class TestLoggedOutUserForPublicSource(Setup, TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.source.can_display_points_publicly = True
        self.source.can_display_details_publicly = True
        self.source.save()

    def test_permissions_calculator(self):
        permissions = models.ExternalDataSource.user_permissions(None, self.source)
        self.assertDictEqual(
            permissions, {"can_display_points": True, "can_display_details": True}
        )

    def test_aggregate_data_count(self):
        """
        Logged out users can't access the sharedDataSource graphql query
        """
        query = """
            query MapReportLayerGeoJSONPoint($sourceId: ID!) {
              sharedDataSource(pk: $sourceId) {
                id
                importedDataCountByRegion {
                  gss
                  count
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={"query": query, "variables": {"sourceId": str(self.source.id)}},
        )
        result = res.json()

        self.assertIsNotNone(result.get("errors", None))
        self.assertIsNone(result["data"])

    def test_generic_data_visibility(self):
        """
        Logged out users can't see generic data
        """
        query = """
            query MapReportLayerGeoJSONPoint($genericDataId: String!) {
              importedDataGeojsonPoint(genericDataId: $genericDataId) {
                id
                geometry {
                  coordinates
                }
                properties {
                  id
                  email
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "query": query,
                "variables": {"genericDataId": str(self.generic_data.id)},
            },
        )
        result = res.json()

        self.assertIsNone(result.get("errors", None))
        self.assertIsNone(result["data"]["importedDataGeojsonPoint"], None)

    def test_vector_tiles_visibility(self):
        zoom = 13
        kwargs = {
            "pk": str(self.source.id),
            "z": zoom,
            "x": geo.lon2tile(self.generic_data.point.x, zoom),
            "y": geo.lat2tile(self.generic_data.point.y, zoom),
        }
        res = self.client.get(
            reverse(
                "external_data_source_point_tile",
                kwargs=kwargs,
            ),
        )
        self.assertIn(res.status_code, [200, 204])
        self.assertEqual(res["Content-Type"], "application/vnd.mapbox-vector-tile")
        self.assertIsNotNone(res.content)


@override_settings(ALLOWED_HOSTS=["testserver"])
class TestLoggedInUserForPublicSource(Setup, TestCase):
    def setUp(self) -> None:
        super().setUp()
        self.source.can_display_points_publicly = True
        self.source.can_display_details_publicly = True
        self.source.save()
        self.other_user = models.User.objects.create_user(
            username="otheruser", password="12345"
        )
        self.client.login(username="otheruser", password="12345")
        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "variables": {"username": "otheruser", "password": "12345"},
                "query": """
            mutation Login($username: String!, $password: String!) {
              tokenAuth(username: $username, password: $password) {
                errors
                success
                token {
                  token
                }
              }
            }
            """,
            },
            headers={},
        )
        self.token = res.json()["data"]["tokenAuth"]["token"]["token"]

    def test_permissions_calculator(self):
        permissions = models.ExternalDataSource.user_permissions(
            self.other_user, self.source
        )
        self.assertDictEqual(
            permissions, {"can_display_points": True, "can_display_details": True}
        )

    def test_aggregate_data_count(self):
        """
        Unshared users can't access the sharedDataSource data
        """

        query = """
            query MapReportLayerGeoJSONPoint($sourceId: ID!) {
              sharedDataSource(pk: $sourceId) {
                id
                importedDataCountByRegion {
                  gss
                  count
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={"query": query, "variables": {"sourceId": str(self.source.id)}},
            headers={
                "Authorization": f"JWT {self.token}",
            },
        )
        result = res.json()

        self.assertIsNotNone(result.get("errors", None))
        self.assertIsNone(result.get("data", None))

    def test_generic_data_visibility(self):
        query = """
            query MapReportLayerGeoJSONPoint($genericDataId: String!) {
              importedDataGeojsonPoint(genericDataId: $genericDataId) {
                id
                geometry {
                  coordinates
                }
                properties {
                  id
                  email
                }
              }
            }
        """

        res = self.client.post(
            reverse("graphql"),
            content_type="application/json",
            data={
                "query": query,
                "variables": {"genericDataId": str(self.generic_data.id)},
            },
            headers={"Authorization": f"JWT {self.token}"},
        )
        result = res.json()

        self.assertIsNone(result.get("errors", None))
        self.assertDictEqual(
            result["data"]["importedDataGeojsonPoint"],
            {
                "id": str(self.generic_data.id),
                "geometry": {"coordinates": [0.0, 0.0]},
                "properties": {"id": str(self.generic_data.id), "email": "xyz@bbc.com"},
            },
        )

    def test_vector_tiles_visibility(self):
        zoom = 13
        kwargs = {
            "pk": str(self.source.id),
            "z": zoom,
            "x": geo.lon2tile(self.generic_data.point.x, zoom),
            "y": geo.lat2tile(self.generic_data.point.y, zoom),
        }
        res = self.client.get(
            reverse(
                "external_data_source_point_tile",
                kwargs=kwargs,
            ),
            headers={"Authorization": f"JWT {self.token}"},
        )
        self.assertIn(res.status_code, [200, 204])
        self.assertEqual(res["Content-Type"], "application/vnd.mapbox-vector-tile")
        self.assertIsNotNone(res.content)
