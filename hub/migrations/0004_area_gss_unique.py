# Generated by Django 4.1 on 2022-10-19 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0003_person_persondata_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="area",
            name="gss",
            field=models.CharField(max_length=30, unique=True),
        ),
    ]