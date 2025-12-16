from django.db import models
from students.models import Student

class GraduatedStudent(models.Model):
    """
    Model to track post-graduation information for students who have completed their courses.
    Links to the existing Student model to avoid data duplication.
    """
    student = models.OneToOneField(
        Student,
        on_delete=models.CASCADE,
        related_name='graduation_info',
        help_text='Reference to the student who graduated'
    )
    
    # Post-graduation education
    graduate_education = models.TextField(
        blank=True,
        null=True,
        help_text='Higher education details after graduation (e.g., BSc in Computer Science - University of Colombo)'
    )
    
    # Employment information
    workplace = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text='Current workplace or company name'
    )
    
    job_description = models.TextField(
        blank=True,
        null=True,
        help_text='Job role and responsibilities'
    )
    
    # Tracking fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Graduated Student'
        verbose_name_plural = 'Graduated Students'
        indexes = [
            models.Index(fields=['student']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.student.registration_no} - {self.student.full_name_english}"
    
    @property
    def is_complete(self):
        """Check if both education and workplace information are provided"""
        return bool(self.graduate_education and self.workplace)
    
    @property
    def has_education(self):
        """Check if education information is provided"""
        return bool(self.graduate_education)
    
    @property
    def has_workplace(self):
        """Check if workplace information is provided"""
        return bool(self.workplace)
