from django.conf import settings
from django.core.management.base import BaseCommand

from asgiref.sync import async_to_sync

from hub.models import AirtableSource, HubHomepage, MapReport, Organisation, User


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        # Create an org for the first user
        user = User.objects.create_user(
            settings.DJANGO_SUPERUSER_USERNAME,
            settings.DJANGO_SUPERUSER_EMAIL,
            settings.DJANGO_SUPERUSER_PASSWORD,
        )
        org = Organisation.get_or_create_for_user(user)

        # Create a data source
        source: AirtableSource = AirtableSource.objects.create(
            name="CK's test airtable",
            data_type=AirtableSource.DataSourceType.EVENT,
            organisation=org,
            api_key=settings.SEED_AIRTABLE_MEMBERLIST_API_KEY,
            base_id=settings.SEED_AIRTABLE_MEMBERLIST_BASE_ID,
            table_id=settings.SEED_AIRTABLE_MEMBERLIST_TABLE_NAME,
            point_field_type=AirtableSource.PointFieldTypes.POSTCODE,
            point_field="Postcode",
            postcode_field="Postcode",
            start_time_field="Start",
            title_field="Name",
            auto_update_enabled=False,
            auto_import_enabled=False,
            can_display_points_publicly=True,
            can_display_details_publicly=True,
            update_mapping=[],
        )

        async_to_sync(AirtableSource.deferred_import_all)(
            external_data_source_id=source.id
        )

        # Create a hub for the org
        hub = HubHomepage.create_for_user(user=1, hostname="testdomain.org", org=org)
        hub.layers = [
            MapReport.MapLayer(
                id=str(source.id), name="Test data", source=str(source.id)
            ),
            # TODO: add some event source
        ]
        hub.save()
