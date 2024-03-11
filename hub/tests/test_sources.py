from django.test import TestCase
from django.conf import settings
from datetime import datetime

from hub.models import AirtableSource


class TestAirtableSource(TestCase):
    ### Test prep

    def setUp(self) -> None:
        self.records_to_delete = []
        self.source = AirtableSource.objects.create(
            name="Test Airtable Source",
            base_id=settings.TEST_AIRTABLE_BASE_ID,
            table_id=settings.TEST_AIRTABLE_TABLE_NAME,
            api_key=settings.TEST_AIRTABLE_API_KEY,
            geography_column="Postcode",
            auto_update_enabled=True,
            auto_update_mapping=[
              {
                "source": "postcodes.io",
                "source_path": "parliamentary_constituency_2025",
                "destination_column": "constituency"
              }
            ]
        )

        self.source.teardown_webhooks()

    def tearDown(self) -> None:
        for record_id in self.records_to_delete:
            self.source.table.delete(record_id)
        self.source.teardown_webhooks()
        return super().tearDown()
    
    def create_test_record(self, record):
        record = self.source.table.create(record)
        self.records_to_delete.append(record['id'])
        return record
    
    def create_many_test_records(self, records):
        records = self.source.table.batch_create(records)
        self.records_to_delete += [record['id'] for record in records]
        return records
    
    ### Tests begin

    def test_airtable_source(self):
        self.assertTrue(self.source.healthcheck())

    async def test_airtable_webhooks(self):
        self.source.teardown_webhooks()
        self.assertFalse(self.source.webhook_healthcheck())
        self.source.setup_webhooks()
        self.assertTrue(self.source.webhook_healthcheck())

    async def test_airtable_fetch_one(self):
        record = self.create_test_record({ "Postcode": "EH99 1SP" })
        # Test this functionality
        record = await self.source.fetch_one(self.source.get_record_id(record))
        # Check
        self.assertEqual(
            self.source.get_record_field(record, 'Postcode'),
            "EH99 1SP"
        )

    async def test_airtable_fetch_many(self):
        date = str(datetime.now().isoformat())
        records = self.create_many_test_records([
            { "Postcode": date + "11111" },
            { "Postcode": date + "22222" }
        ])
        # Test this functionality
        records = await self.source.fetch_many([record['id'] for record in records])
        # Check
        assert len(records) == 2
        for record in records:
            self.assertTrue(
                self.source.get_record_field(record, 'Postcode').startswith(date)
            )

    async def test_airtable_refresh_one(self):
        record = self.create_test_record({ "Postcode": "EH99 1SP" })
        # Test this functionality
        await self.source.refresh_one(record)
        # Check
        record = await self.source.fetch_one(self.source.get_record_id(record))
        self.assertEqual(
            self.source.get_record_field(record, 'constituency'),
            "Edinburgh East and Musselburgh"
        )

    async def test_airtable_refresh_many(self):
        records = self.create_many_test_records([
            { "Postcode": "G11 5RD" },
            { "Postcode": "G42 8PH" }
        ])
        # Test this functionality
        await self.source.refresh_many(records)
        # Check
        records = await self.source.fetch_many([record['id'] for record in records])
        assert len(records) == 2
        for record in records:
            if self.source.get_record_field(record, "Postcode") == "G11 5RD":
                self.assertEqual(
                    record['fields']['constituency'],
                    "Glasgow West"
                )
            elif self.source.get_record_field(record, "Postcode") == "G42 8PH":
                self.assertEqual(
                    record['fields']['constituency'],
                    "Glasgow South"
                )