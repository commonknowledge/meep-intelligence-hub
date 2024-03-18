import json

from django.http import JsonResponse
from django.views.generic import View


class ExternalDataSourceAutoUpdateWebhook(View):
    base_path = "webhook/auto_update"

    def post(self, request, *args, **kwargs):
        from hub.models import ExternalDataSource

        print("Webhook received", self.kwargs)
        # 1. Match the payload to a ExternalDataSource
        external_data_source_id = self.kwargs["external_data_source_id"]
        external_data_source = ExternalDataSource.objects.get(
            id=external_data_source_id
        )
        if not external_data_source:
            return JsonResponse({"status": "You need to set up a webhook first."})
        if not external_data_source.auto_update_enabled:
            return JsonResponse({"status": "Webhook is not enabled."})
        return external_data_source.handle_update_webhook_view(json.loads(request.body))
