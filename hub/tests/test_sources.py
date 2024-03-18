from datetime import datetime

from django.conf import settings
from django.test import TestCase

from asgiref.sync import async_to_sync, sync_to_async

from hub.models import AirtableSource, Organisation


class TestAirtableSource(TestCase):
    # Test prep

    def setUp(self) -> None:
        self.records_to_delete: list[tuple[str, AirtableSource]] = []

        self.organisation = Organisation.objects.create(
            name="Test Organisation", slug="test-organisation"
        )

        self.custom_data_layer: AirtableSource = AirtableSource.objects.create(
            name="Mayoral regions custom data layer",
            data_type=AirtableSource.DataSourceType.OTHER,
            organisation=self.organisation,
            base_id=settings.TEST_AIRTABLE_CUSTOMDATALAYER_BASE_ID,
            table_id=settings.TEST_AIRTABLE_CUSTOMDATALAYER_TABLE_NAME,
            api_key=settings.TEST_AIRTABLE_CUSTOMDATALAYER_API_KEY,
            geography_column="council district",
            geography_column_type=AirtableSource.PostcodesIOGeographyTypes.COUNCIL,
        )

        self.source: AirtableSource = AirtableSource.objects.create(
            name="My test Airtable member list",
            data_type=AirtableSource.DataSourceType.MEMBER,
            organisation=self.organisation,
            base_id=settings.TEST_AIRTABLE_MEMBERLIST_BASE_ID,
            table_id=settings.TEST_AIRTABLE_MEMBERLIST_TABLE_NAME,
            api_key=settings.TEST_AIRTABLE_MEMBERLIST_API_KEY,
            geography_column="Postcode",
            geography_column_type=AirtableSource.PostcodesIOGeographyTypes.POSTCODE,
            auto_update_enabled=True,
            update_mapping=[
                {
                    "source": "postcodes.io",
                    "source_path": "parliamentary_constituency_2025",
                    "destination_column": "constituency",
                },
                {
                    "source": str(self.custom_data_layer.id),
                    "source_path": "mayoral region",
                    "destination_column": "mayoral region",
                },
            ],
        )

        self.source.teardown_webhooks()

    def tearDown(self) -> None:
        for record_id, source in self.records_to_delete:
            source.table.delete(record_id)
        self.source.teardown_webhooks()
        return super().tearDown()

    def create_test_record(self, record, source=None):
        source = source or self.source
        record = source.table.create(record)
        self.records_to_delete.append((record["id"], source))
        return record

    def create_many_test_records(self, records, source=None):
        source = source or self.source
        records = source.table.batch_create(records)
        self.records_to_delete += [(record["id"], source) for record in records]
        return records

    # Tests begin

    def test_airtable_source(self):
        self.assertTrue(self.source.healthcheck())

    async def test_airtable_webhooks(self):
        self.source.teardown_webhooks()
        self.assertFalse(self.source.webhook_healthcheck())
        self.source.setup_webhooks()
        self.assertTrue(self.source.webhook_healthcheck())

    async def test_import_async(self):
        self.create_many_test_records(
            [
                {
                    "council district": "County Durham",
                    "mayoral region": "North East Mayoral Combined Authority",
                },
                {
                    "council district": "Northumberland",
                    "mayoral region": "North East Mayoral Combined Authority",
                },
            ],
            source=self.custom_data_layer,
        )
        await self.custom_data_layer.import_all()
        enrichment_df = await sync_to_async(
            self.custom_data_layer.get_import_dataframe
        )()
        self.assertGreaterEqual(len(enrichment_df.index), 2)

    def test_import_all(self):
        # Confirm the database is empty
        original_count = self.custom_data_layer.get_import_data().count()
        self.assertEqual(original_count, 0)
        # Add some test data
        self.create_many_test_records(
            [
                {
                    "council district": "County Durham",
                    "mayoral region": "North East Mayoral Combined Authority",
                },
                {
                    "council district": "Northumberland",
                    "mayoral region": "North East Mayoral Combined Authority",
                },
            ],
            source=self.custom_data_layer,
        )
        self.assertGreaterEqual(
            len(list(async_to_sync(self.custom_data_layer.fetch_all)())), 2
        )
        # Check that the import is storing it all
        fetch_count = len(list(async_to_sync(self.custom_data_layer.fetch_all)()))
        async_to_sync(self.custom_data_layer.import_all)()
        import_data = self.custom_data_layer.get_import_data()
        import_count = len(import_data)
        self.assertEqual(import_count, fetch_count)
        # assert that 'council district' and 'mayoral region' keys are in the JSON object
        self.assertIn("council district", import_data[0].json)
        self.assertIn("mayoral region", import_data[0].json)
        self.assertIn(
            import_data[0].json["council district"],
            [
                "Newcastle upon Tyne",
                "North Tyneside",
                "South Tyneside",
                "Gateshead",
                "County Durham",
                "Sunderland",
                "Northumberland",
            ],
        )
        self.assertIn(
            import_data[0].json["mayoral region"],
            ["North East Mayoral Combined Authority"],
        )
        df = self.custom_data_layer.get_import_dataframe()
        # assert len(df.index) == import_count
        self.assertIn("council district", list(df.columns.values))
        self.assertIn("mayoral region", list(df.columns.values))
        self.assertEqual(len(df.index), import_count)

    async def test_airtable_fetch_one(self):
        record = self.create_test_record({"Postcode": "EH99 1SP"})
        # Test this functionality
        record = await self.source.fetch_one(self.source.get_record_id(record))
        # Check
        self.assertEqual(self.source.get_record_field(record, "Postcode"), "EH99 1SP")

    async def test_airtable_fetch_many(self):
        date = str(datetime.now().isoformat())
        records = self.create_many_test_records(
            [{"Postcode": date + "11111"}, {"Postcode": date + "22222"}]
        )
        # Test this functionality
        records = await self.source.fetch_many([record["id"] for record in records])
        # Check
        assert len(records) == 2
        for record in records:
            self.assertTrue(
                self.source.get_record_field(record, "Postcode").startswith(date)
            )

    async def test_airtable_refresh_one(self):
        record = self.create_test_record({"Postcode": "EH99 1SP"})
        # Test this functionality
        await self.source.refresh_one(record)
        # Check
        record = await self.source.fetch_one(self.source.get_record_id(record))
        self.assertEqual(
            self.source.get_record_field(record, "constituency"),
            "Edinburgh East and Musselburgh",
        )

    def test_pivot_table(self):
        """
        This is testing the ability for self.source to be updated using data from self.custom_data_layer
        i.e. to test the pivot table functionality
        that brings custom campaign data back into the CRM, based on geography
        """
        # Add some test data
        self.create_many_test_records(
            [
                {
                    "council district": "County Durham",
                    "mayoral region": "North East Mayoral Combined Authority",
                },
                {
                    "council district": "Northumberland",
                    "mayoral region": "North East Mayoral Combined Authority",
                },
            ],
            source=self.custom_data_layer,
        )
        # Check that the import is storing it all
        async_to_sync(self.custom_data_layer.import_all)()
        # Add a test record
        record = self.create_test_record({"Postcode": "NE12 6DD"})
        mapped_member = async_to_sync(self.source.map_one)(
            record, loaders=async_to_sync(self.source.get_loaders)()
        )
        self.assertEqual(
            mapped_member["update_fields"]["mayoral region"],
            "North East Mayoral Combined Authority",
        )

    async def test_airtable_refresh_many(self):
        records = self.create_many_test_records(
            [{"Postcode": "G11 5RD"}, {"Postcode": "G42 8PH"}]
        )
        # Test this functionality
        await self.source.refresh_many(records)
        # Check
        records = await self.source.fetch_many([record["id"] for record in records])
        assert len(records) == 2
        for record in records:
            if self.source.get_record_field(record, "Postcode") == "G11 5RD":
                self.assertEqual(record["fields"]["constituency"], "Glasgow West")
            elif self.source.get_record_field(record, "Postcode") == "G42 8PH":
                self.assertEqual(record["fields"]["constituency"], "Glasgow South")

    def test_airtable_filter(self):
        date = str(datetime.now().isoformat())
        self.create_many_test_records(
            [{"Postcode": date + "11111"}, {"Postcode": date + "22222"}]
        )
        # Test this functionality
        records = self.source.filter({"Postcode": date + "11111"})
        # Check
        assert len(records) == 1
        self.assertEqual(
            self.source.get_record_field(records[0], "Postcode"), date + "11111"
        )
