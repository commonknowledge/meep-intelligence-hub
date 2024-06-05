# Generated by Django 4.2.11 on 2024-06-05 11:25

from django.db import migrations, models
from django.db.models.functions import Upper
import django_choices_field.fields
import hub.models


def uppercase_geography_column_type(apps, schema_editor):
    ExternalDataSource = apps.get_model("hub", "ExternalDataSource")

    ExternalDataSource.objects.update(
        geography_column_type=Upper("geography_column_type")
    )


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0128_merge_20240605_0818"),
    ]

    operations = [
        migrations.AlterField(
            model_name="externaldatasource",
            name="geography_column_type",
            field=django_choices_field.fields.TextChoicesField(
                choices=[
                    ("ADDRESS", "Address"),
                    ("POSTCODE", "Postcode"),
                    ("WARD", "Ward"),
                    ("CONSTITUENCY", "Constituency"),
                    ("COUNCIL", "Council"),
                    ("CONSTITUENCY_2025", "Constituency (2024)"),
                ],
                choices_enum=hub.models.ExternalDataSource.GeographyTypes,
                default="POSTCODE",
                max_length=17,
            ),
        ),
        migrations.RunPython(
            uppercase_geography_column_type, reverse_code=migrations.RunPython.noop
        ),
        migrations.AlterField(
            model_name="genericdata",
            name="image",
            field=models.ImageField(
                max_length=1000, null=True, upload_to="generic_data"
            ),
        ),
        migrations.AlterField(
            model_name="organisation",
            name="logo",
            field=models.ImageField(blank=True, null=True, upload_to="organisation"),
        ),
    ]
