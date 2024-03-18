from __future__ import annotations

from procrastinate.contrib.django import app


@app.task(queue="index")
async def refresh_one(external_data_source_id: str, member_id: str):
    from hub.models import ExternalDataSource

    await ExternalDataSource.deferred_refresh_one(
        external_data_source_id=external_data_source_id, member_id=member_id
    )


@app.task(queue="index")
async def refresh_many(external_data_source_id: str, member_ids: list[str]):
    from hub.models import ExternalDataSource

    await ExternalDataSource.deferred_refresh_many(
        external_data_source_id=external_data_source_id, member_ids=member_ids
    )


@app.task(queue="index")
async def refresh_all(external_data_source_id: str):
    from hub.models import ExternalDataSource

    await ExternalDataSource.deferred_refresh_all(
        external_data_source_id=external_data_source_id
    )


# Refresh webhooks once a day
@app.periodic(cron="0 3 * * *")
@app.task(queue="index")
async def refresh_webhooks(external_data_source_id: str, timestamp):
    from hub.models import ExternalDataSource

    await ExternalDataSource.deferred_refresh_webhooks(
        external_data_source_id=external_data_source_id
    )


@app.task(queue="index")
async def import_all(external_data_source_id: str):
    from hub.models import ExternalDataSource

    await ExternalDataSource.deferred_import_all(
        external_data_source_id=external_data_source_id
    )
