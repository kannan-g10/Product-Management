from django.urls import path
from Authentication.views import RegisterView
from .views import *

urlpatterns = [
    path("details/", ProductView.as_view(), name="products"),
    path("details/<int:pk>/", ProductView.as_view(), name="product_detail"),
]
