from functools import cache

from hub.models import Area, DataSet


class TitleMixin:
    site_title = "Local Intelligence Hub"

    def get_page_title(self):
        if self.page_title:
            return f"{self.page_title} | {self.site_title}"
        else:
            return f"{self.site_title}"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page_title"] = self.get_page_title()
        return context


class FilterMixin:
    @cache
    def filters(self):
        filters = []
        for param, value in self.request.GET.items():
            if "__" in param and param != "shader":
                name, comparator = param.split("__", 1)
            else:  # pragma: nocover
                continue

            try:
                dataset = DataSet.objects.get(name=name)
                filters.append(
                    {
                        "dataset": dataset,
                        "comparator": comparator,
                        "value": value,
                    }
                )
            except DataSet.DoesNotExist:  # pragma: nocover
                pass

        return filters

    def query(self):
        query = Area.objects
        for f in self.filters():
            query = f["dataset"].filter(
                query,
                comparator=f["comparator"],
                value=f["value"],
            )

        return query
