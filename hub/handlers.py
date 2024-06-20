from corsheaders.signals import check_request_enabled
from wagtail.models import Site

def cors_logic(sender, request, **kwargs):
    # if not already handled by CORS_ALLOWED_ORIGINS

    # Anyone can access the public API
    if request.path.startswith("/api/"):
        return True
    
    # And multi-tenant sites can acces the API and media assets etc.
    return Site.objects.filter(hostname=request.headers["origin"]).exists()

# https://pypi.org/project/django-cors-headers/#:~:text=com%22%2C%0A%5D-,Signals,-If%20you%20have
check_request_enabled.connect(cors_logic)