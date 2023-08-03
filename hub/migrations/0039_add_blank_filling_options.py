# Generated by Django 4.1.2 on 2023-05-24 10:04

from django.db import migrations, models
import django_jsonform.models.fields
import hub.models


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0038_make_categorical_data_shading_consistent"),
    ]

    operations = [
        migrations.AddField(
            model_name="dataset",
            name="exclude_countries",
            field=django_jsonform.models.fields.JSONField(
                blank=True, default=hub.models.DataSet.exclude_countries_default
            ),
        ),
        migrations.AddField(
            model_name="dataset",
            name="fill_blanks",
            field=models.BooleanField(default=True),
        ),
    ]