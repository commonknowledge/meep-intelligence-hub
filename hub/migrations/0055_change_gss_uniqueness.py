# Generated by Django 4.2.5 on 2023-11-07 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0054_fill_datatype_area_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="area",
            name="gss",
            field=models.CharField(max_length=30),
        ),
        migrations.AlterUniqueTogether(
            name="area",
            unique_together={("gss", "area_type")},
        ),
    ]