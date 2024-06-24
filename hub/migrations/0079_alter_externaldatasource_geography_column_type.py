# Generated by Django 4.2.10 on 2024-03-11 03:45

from django.db import migrations
import django_choices_field.fields
import hub.models


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0078_rename_auto_update_mapping_externaldatasource_update_mapping"),
    ]

    operations = [
        migrations.AlterField(
            model_name="externaldatasource",
            name="geography_column_type",
            field=django_choices_field.fields.TextChoicesField(
                choices=[
                    ("postcode", "Postcode"),
                    ("ward", "Ward"),
                    ("council", "Council"),
                    ("constituency", "Constituency"),
                    ("constituency_2025", "Constituency (2024)"),
                ],
                choices_enum=hub.models.ExternalDataSource.PointFieldTypes,
                default="postcode",
                max_length=17,
            ),
        ),
    ]
