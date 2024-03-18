# Generated by Django 4.2.10 on 2024-03-11 10:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0080_dataset_external_data_source_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="GenericData",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("data", models.CharField(max_length=400)),
                ("date", models.DateTimeField(blank=True, null=True)),
                ("float", models.FloatField(blank=True, null=True)),
                ("int", models.IntegerField(blank=True, null=True)),
                ("json", models.JSONField(blank=True, null=True)),
                (
                    "data_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="hub.datatype"
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
