# Generated by Django 4.2.5 on 2024-01-15 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0060_alter_person_id_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="dataset",
            name="data_type",
            field=models.CharField(
                choices=[
                    ("text", "Text"),
                    ("integer", "Integer"),
                    ("float", "Floating Point Number"),
                    ("percent", "Percentage"),
                    ("date", "Date"),
                    ("boolean", "True/False"),
                    ("profile_id", "Profile Id"),
                    ("json", "JSON data"),
                    ("url", "URL"),
                ],
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="datatype",
            name="data_type",
            field=models.CharField(
                choices=[
                    ("text", "Text"),
                    ("integer", "Integer"),
                    ("float", "Floating Point Number"),
                    ("percent", "Percentage"),
                    ("date", "Date"),
                    ("boolean", "True/False"),
                    ("profile_id", "Profile Id"),
                    ("json", "JSON data"),
                    ("url", "URL"),
                ],
                max_length=20,
            ),
        ),
    ]