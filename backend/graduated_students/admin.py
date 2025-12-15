from django.contrib import admin
from .models import GraduatedStudent


@admin.register(GraduatedStudent)
class GraduatedStudentAdmin(admin.ModelAdmin):
    list_display = [
        'get_registration_no',
        'get_student_name',
        'get_course',
        'has_education',
        'has_workplace',
        'is_complete',
        'created_at',
    ]
    list_filter = [
        'student__course',
        'student__center',
        'student__district',
        'created_at',
    ]
    search_fields = [
        'student__registration_no',
        'student__full_name_english',
        'graduate_education',
        'workplace',
    ]
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Student Information', {
            'fields': ('student',)
        }),
        ('Post-Graduation Details', {
            'fields': ('graduate_education', 'workplace', 'job_description')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_registration_no(self, obj):
        return obj.student.registration_no
    get_registration_no.short_description = 'Registration No'
    get_registration_no.admin_order_field = 'student__registration_no'
    
    def get_student_name(self, obj):
        return obj.student.full_name_english
    get_student_name.short_description = 'Student Name'
    get_student_name.admin_order_field = 'student__full_name_english'
    
    def get_course(self, obj):
        return obj.student.course.name if obj.student.course else '-'
    get_course.short_description = 'Course'
    get_course.admin_order_field = 'student__course__name'
