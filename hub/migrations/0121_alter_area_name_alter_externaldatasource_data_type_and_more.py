# Generated by Django 4.2.11 on 2024-05-29 12:25

from django.db import migrations, models
from django.db.models.functions import Upper
import django_choices_field.fields
import hub.models


def uppercase_datatype(apps, schema_editor):
    ExternalDataSource = apps.get_model("hub", "ExternalDataSource")

    ExternalDataSource.objects.update(data_type=Upper("data_type"))


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0120_externaldatasource_description_field_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="area",
            name="name",
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name="externaldatasource",
            name="data_type",
            field=django_choices_field.fields.TextChoicesField(
                choices=[
                    ("MEMBER", "Members or supporters"),
                    ("REGION", "Areas or regions"),
                    ("EVENT", "Events"),
                    ("LOCATION", "Locations"),
                    ("STORY", "Stories"),
                    ("OTHER", "Other"),
                ],
                choices_enum=hub.models.ExternalDataSource.DataSourceType,
                default="OTHER",
                max_length=8,
            ),
        ),
        migrations.RunPython(uppercase_datatype),
        migrations.AlterField(
            model_name="hubhomepage",
            name="puck_json_content",
            field=models.JSONField(
                blank=True, default=hub.models.generate_puck_json_content
            ),
        ),
    ]
