# Generated by Django 4.1 on 2022-10-26 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0005_add_date_to_persondata"),
    ]

    operations = [
        migrations.AlterField(
            model_name="datatype",
            name="name",
            field=models.CharField(max_length=50),
        ),
    ]
