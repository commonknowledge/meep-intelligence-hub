from __future__ import annotations

import logging

from procrastinate.contrib.django import app


logger = logging.getLogger(__name__)

@app.task(queue="index")
async def update_one(config_id: str, member_id: str):
    from hub.models import ExternalDataSourceUpdateConfig
    logger.info(f"--- doing update one {config_id} {member_id}")
    await ExternalDataSourceUpdateConfig.deferred_update_one(config_id=config_id, member_id=member_id)


@app.task(queue="index")
async def update_many(config_id: str, member_ids: list[str]):
    from hub.models import ExternalDataSourceUpdateConfig
    logger.info(f"--- doing update many {config_id} {member_ids}")
    await ExternalDataSourceUpdateConfig.deferred_update_many(config_id=config_id, member_ids=member_ids)


@app.task(queue="index")
async def update_all(config_id: str):
    from hub.models import ExternalDataSourceUpdateConfig
    await ExternalDataSourceUpdateConfig.deferred_update_all(config_id=config_id)

# Refresh webhooks once a day
@app.periodic(cron="0 3 * * *")
@app.task(queue="index")
async def refresh_webhook(config_id: str):
    from hub.models import ExternalDataSourceUpdateConfig
    await ExternalDataSourceUpdateConfig.deferred_refresh_webhook(config_id=config_id)