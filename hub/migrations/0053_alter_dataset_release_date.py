# Generated by Django 4.1.2 on 2023-10-26 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0052_add_dataset_is_public_flag"),
    ]

    operations = [
        migrations.AlterField(
            model_name="dataset",
            name="release_date",
            field=models.TextField(blank=True, null=True),
        ),
    ]
