from django.conf import settings
from django.urls import include, path
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views
from django.http import HttpResponseRedirect, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from artuium_server.common import models as common_models

import os

def redirect_home(self):
    home_redirect_url = common_models.HomeRedirectURL.objects.all().first().url
    return HttpResponseRedirect(home_redirect_url)

def text_response(self):
    my_file =  open(os.path.join(settings.ROOT_DIR, 'config', 'apple-developer-domain-association.txt'), 'r') 
    response = HttpResponse(my_file.read(), content_type='text/plain')
    response['Content-Disposition'] = 'inline;filename=apple-developer-domain-association.txt'
    return response

class HealthCheck(APIView):
    def get(self, request, format = None):
        return Response(status = status.HTTP_200_OK)

urlpatterns = [
    path("health/", HealthCheck.as_view()),
    path(".well-known/apple-developer-domain-association.txt", text_response, name="text"),
    path("terms/privacy/", TemplateView.as_view(template_name="terms/privacy.html"), name="privacy"),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # User management
    path("api/users/", include("artuium_server.users.urls", namespace="users")),
    path("api/artwork/", include("artuium_server.artwork.urls", namespace="artwork")),
    path("api/statics/", include("artuium_server.statics.urls", namespace="statics")),
    path("api/exhibition/", include("artuium_server.exhibition.urls", namespace="exhibition")),
    path("api/common/", include("artuium_server.common.urls", namespace="common")),
    path("accounts/", include("allauth.urls")),
    path("", redirect_home, name="home"),
    # Your stuff: custom urls includes go here
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
