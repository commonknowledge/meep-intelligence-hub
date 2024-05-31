# Generated by Django 4.2.10 on 2024-03-13 01:37

from django.db import migrations
import django_choices_field.fields
import hub.models


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0082_alter_externaldatasource_geography_column_type"),
    ]

    operations = [
        migrations.AddField(
            model_name="externaldatasource",
            name="data_type",
            field=django_choices_field.fields.TextChoicesField(
                choices=[
                    ("MEMBER", "Members or supporters"),
                    ("REGION", "Areas or regions"),
                    ("OTHER", "Other"),
                ],
                choices_enum=hub.models.ExternalDataSource.DataSourceType,
                default="OTHER",
                max_length=6,
            ),
        ),
    ]
