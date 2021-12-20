from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Movie)
admin.site.register(Actor)
admin.site.register(Review)
admin.site.register(Episode)