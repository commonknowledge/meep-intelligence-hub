# Generated by Django 4.2.10 on 2024-04-17 12:35

from django.db import migrations
import hub.fields


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0100_merge_20240408_1328"),
    ]

    operations = [
        migrations.AddField(
            model_name="airtablesource",
            name="encrypted_api_key",
            field=hub.fields.EncryptedCharField(
                default="default_value",
                help_text="Personal access token. Requires the following 4 scopes: data.records:read, data.records:write, schema.bases:read, webhook:manage",
                max_length=250,
            ),
        ),
        migrations.AddField(
            model_name="mailchimpsource",
            name="encrypted_api_key",
            field=hub.fields.EncryptedCharField(
                default="", help_text="Mailchimp API key.", max_length=250
            ),
            preserve_default=False,
        ),
    ]
