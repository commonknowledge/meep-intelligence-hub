# Generated by Django 4.1.2 on 2023-04-27 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0036_userproperties_agreed_terms"),
    ]

    operations = [
        migrations.AddField(
            model_name="dataset",
            name="is_shadable",
            field=models.BooleanField(default=True),
        ),
    ]