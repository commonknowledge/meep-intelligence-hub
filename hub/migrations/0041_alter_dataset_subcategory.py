# Generated by Django 4.1.2 on 2023-05-04 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0040_update_country_exclusions_and_fill_blanks"),
    ]

    operations = [
        migrations.AlterField(
            model_name="dataset",
            name="subcategory",
            field=models.TextField(
                blank=True,
                choices=[
                    ("net_zero_support", "Support for net zero"),
                    ("renewable_energy", "Renewable energy"),
                    ("voting", "Voting"),
                    ("government_action", "Government action"),
                    ("supporters_and_activists", "Supporters and activists"),
                    ("groups", "Groups"),
                    ("places_and_spaces", "Places and spaces"),
                    ("events", "Events"),
                    ("cost_of_living", "Cost of living"),
                ],
                null=True,
            ),
        ),
    ]
