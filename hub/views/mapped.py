import json

from django.http import JsonResponse
from django.views.generic import View

from hub.models import ExternalDataSourceUpdateConfig


class CRMRecordUpdatedWebhookView(View):
    def post(self, request, *args, **kwargs):
        print("Webhook received", self.kwargs)
        # 1. Match the payload to a ExternalDataSourceUpdateConfig
        config_id = self.kwargs["config_id"]
        config = ExternalDataSourceUpdateConfig.objects.get(id=config_id)
        if not config:
            return JsonResponse({"status": "You need to set up a webhook first."})
        if not config.enabled:
            return JsonResponse({"status": "Webhook is not enabled."})
        return config.handle_update_webhook_view(json.loads(request.body))
