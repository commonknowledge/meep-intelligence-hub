# Generated by Django 4.2.11 on 2024-05-28 10:22

from django.db import migrations
from django.db.migrations.state import ProjectState


class Migration(migrations.Migration):

    dependencies = [
        ("hub", "0114_remove_hubhomepage_custom_domain"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="mailchimpsource",
            unique_together=set(),
        ),
    ]

    def apply(self, project_state: ProjectState, *args, **kwargs) -> ProjectState:
        """
        The AlterUniqueTogether migration above fails if no unique constraint exists.
        This try/except allows the migration to succeed in this case.
        """
        try:
            return super().apply(project_state, *args, **kwargs)
        except Exception as e:
            if (
                str(e)
                == "Found wrong number (0) of constraints for hub_mailchimpsource(list_id, api_key)"
            ):
                return project_state
            raise e
