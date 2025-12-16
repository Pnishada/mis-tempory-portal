# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from centers.models import Center

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('district_manager', 'District Manager'),
        ('training_officer', 'Training Officer'),
        ('data_entry', 'Data Entry'),  # CBT Data Entry
        ('instructor', 'Instructor'),
        # NTT Roles
        ('ntt_admin', 'Admin'),
        ('ntt_data_entry', 'Data Entry'),
    )

    SYSTEM_CHOICES = (
        ('CBT', 'CBT'),
        ('NTT', 'NTT'),
    )

    email = models.EmailField(unique=True)
    system_type = models.CharField(max_length=10, choices=SYSTEM_CHOICES, default='CBT', verbose_name="System Type")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='data_entry')
    center = models.ForeignKey(
        Center,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users'
    )
    district = models.CharField(max_length=100, blank=True, null=True)
    district = models.CharField(max_length=100, blank=True, null=True)
    epf_no = models.CharField(max_length=50, blank=True, null=True, verbose_name="EPF Number")
    phone_number = models.CharField(max_length=20, blank=True, null=True, verbose_name="Phone Number")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email