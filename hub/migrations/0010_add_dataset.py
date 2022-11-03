# Generated by Django 4.1.2 on 2022-11-03 11:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0009_areadata"),
    ]

    operations = [
        migrations.CreateModel(
            name="DataSet",
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
                ("name", models.CharField(max_length=50)),
                ("description", models.TextField(blank=True, null=True)),
                ("label", models.CharField(blank=True, max_length=200, null=True)),
                (
                    "data_type",
                    models.CharField(
                        choices=[
                            ("text", "Text"),
                            ("integer", "Integer"),
                            ("float", "Floating Point Number"),
                            ("date", "Date"),
                            ("boolean", "True/False"),
                            ("profile_id", "Profile Id"),
                        ],
                        max_length=20,
                    ),
                ),
                ("last_update", models.DateTimeField(auto_now=True)),
                ("source", models.CharField(max_length=200)),
            ],
        ),
        migrations.AlterField(
            model_name="datatype",
            name="data_type",
            field=models.CharField(
                choices=[
                    ("text", "Text"),
                    ("integer", "Integer"),
                    ("float", "Floating Point Number"),
                    ("date", "Date"),
                    ("boolean", "True/False"),
                    ("profile_id", "Profile Id"),
                ],
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name="datatype",
            name="data_set",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, to="hub.dataset"
            ),
        ),
    ]
