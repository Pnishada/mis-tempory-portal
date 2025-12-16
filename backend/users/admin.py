from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'system_type', 'role', 'district', 'center', 'is_staff', 'is_active')
    list_filter = ('system_type', 'role', 'district', 'center', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Access Control', {'fields': ('system_type', 'role', 'is_active', 'is_staff', 'groups', 'user_permissions')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Location Info', {'fields': ('district', 'center')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'system_type', 'role', 'district', 'center', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('username', 'email', 'district')
    ordering = ('username',)

    class Media:
        js = ('users/js/admin_role_filter.js',)