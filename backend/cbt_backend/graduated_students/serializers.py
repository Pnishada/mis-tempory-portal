from rest_framework import serializers
from .models import GraduatedStudent
from students.models import Student, EducationalQualification

class StudentBasicSerializer(serializers.ModelSerializer):
    """Serializer for complete student information to include in graduated student records"""
    center_name = serializers.SerializerMethodField()
    course_name = serializers.SerializerMethodField()
    batch_name = serializers.SerializerMethodField()
    batch_code = serializers.SerializerMethodField()
    batch_display = serializers.SerializerMethodField()
    profile_photo_url = serializers.SerializerMethodField()
    ol_results = serializers.SerializerMethodField()
    al_results = serializers.SerializerMethodField()
    
    class Meta:
        model = Student
        fields = [
            'id',
            'registration_no',
            'district_code',
            'course_code',
            'batch',
            'batch_code',
            'batch_display',
            'batch_name',
            'batch_year',
            'student_number',
            'registration_year',
            'full_name_english',
            'full_name_sinhala',
            'name_with_initials',
            'gender',
            'date_of_birth',
            'nic_id',
            'address_line',
            'district',
            'divisional_secretariat',
            'grama_niladhari_division',
            'village',
            'marital_status',
            'mobile_no',
            'email',
            'training_received',
            'training_provider',
            'course_vocation_name',
            'training_duration',
            'training_nature',
            'training_establishment',
            'training_placement_preference',
            'center',
            'center_name',
            'course',
            'course_name',
            'enrollment_date',
            'enrollment_status',
            'date_of_application',
            'profile_photo_url',
            'ol_results',
            'al_results',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'registration_no', 'created_at', 'updated_at']
    
    def get_center_name(self, obj):
        return obj.center.name if obj.center else None

    def get_course_name(self, obj):
        return obj.course.name if obj.course else None

    def get_batch_name(self, obj):
        return obj.batch.batch_name if obj.batch else None

    def get_batch_code(self, obj):
        return obj.batch.batch_code if obj.batch else None

    def get_batch_display(self, obj):
        return obj.batch.batch_name if obj.batch else None
    
    def get_profile_photo_url(self, obj):
        if obj.profile_photo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile_photo.url)
        return None
    
    def get_ol_results(self, obj):
        qualifications = EducationalQualification.objects.filter(student=obj, type='OL')
        return [{
            'id': q.id,
            'subject': q.subject,
            'grade': q.grade,
            'year': q.year,
            'type': q.type
        } for q in qualifications]
    
    def get_al_results(self, obj):
        qualifications = EducationalQualification.objects.filter(student=obj, type='AL')
        return [{
            'id': q.id,
            'subject': q.subject,
            'grade': q.grade,
            'year': q.year,
            'type': q.type
        } for q in qualifications]


class GraduatedStudentSerializer(serializers.ModelSerializer):
    """Serializer for graduated student with nested student information"""
    student_details = StudentBasicSerializer(source='student', read_only=True)
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.filter(enrollment_status='Completed'),
        source='student',
        write_only=True
    )
    
    # Computed fields
    is_complete = serializers.BooleanField(read_only=True)
    has_education = serializers.BooleanField(read_only=True)
    has_workplace = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = GraduatedStudent
        fields = [
            'id',
            'student_id',
            'student_details',
            'graduate_education',
            'workplace',
            'job_description',
            'is_complete',
            'has_education',
            'has_workplace',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_student_id(self, value):
        """Ensure the student has completed their course"""
        if value.enrollment_status != 'Completed':
            raise serializers.ValidationError(
                "Only students with 'Completed' enrollment status can be added to graduated students."
            )
        return value


class GraduatedStudentListSerializer(serializers.ModelSerializer):
    """Serializer for list views with complete student information"""
    # Include all student fields directly
    student_id = serializers.IntegerField(source='student.id', read_only=True)
    registration_no = serializers.CharField(source='student.registration_no', read_only=True)
    district_code = serializers.CharField(source='student.district_code', read_only=True)
    course_code = serializers.CharField(source='student.course_code', read_only=True)
    batch = serializers.IntegerField(source='student.batch.id', read_only=True)
    
    # Safe fields using methods
    batch_code = serializers.SerializerMethodField()
    batch_display = serializers.SerializerMethodField()
    batch_name = serializers.SerializerMethodField()
    
    batch_year = serializers.CharField(source='student.batch_year', read_only=True)
    student_number = serializers.IntegerField(source='student.student_number', read_only=True)
    registration_year = serializers.CharField(source='student.registration_year', read_only=True)
    
    full_name_english = serializers.CharField(source='student.full_name_english', read_only=True)
    full_name_sinhala = serializers.CharField(source='student.full_name_sinhala', read_only=True)
    name_with_initials = serializers.CharField(source='student.name_with_initials', read_only=True)
    gender = serializers.CharField(source='student.gender', read_only=True)
    date_of_birth = serializers.DateField(source='student.date_of_birth', read_only=True)
    nic_id = serializers.CharField(source='student.nic_id', read_only=True)
    
    address_line = serializers.CharField(source='student.address_line', read_only=True)
    district = serializers.CharField(source='student.district', read_only=True)
    divisional_secretariat = serializers.CharField(source='student.divisional_secretariat', read_only=True)
    grama_niladhari_division = serializers.CharField(source='student.grama_niladhari_division', read_only=True)
    village = serializers.CharField(source='student.village', read_only=True)
    marital_status = serializers.CharField(source='student.marital_status', read_only=True)
    
    mobile_no = serializers.CharField(source='student.mobile_no', read_only=True)
    email = serializers.EmailField(source='student.email', read_only=True)
    
    training_received = serializers.BooleanField(source='student.training_received', read_only=True)
    training_provider = serializers.CharField(source='student.training_provider', read_only=True)
    course_vocation_name = serializers.CharField(source='student.course_vocation_name', read_only=True)
    training_duration = serializers.CharField(source='student.training_duration', read_only=True)
    training_nature = serializers.CharField(source='student.training_nature', read_only=True)
    training_establishment = serializers.CharField(source='student.training_establishment', read_only=True)
    training_placement_preference = serializers.CharField(source='student.training_placement_preference', read_only=True)
    
    center = serializers.IntegerField(source='student.center.id', read_only=True)
    center_name = serializers.SerializerMethodField()
    course = serializers.IntegerField(source='student.course.id', read_only=True)
    course_name = serializers.SerializerMethodField()
    
    enrollment_date = serializers.DateField(source='student.enrollment_date', read_only=True)
    enrollment_status = serializers.CharField(source='student.enrollment_status', read_only=True)
    date_of_application = serializers.DateField(source='student.date_of_application', read_only=True)
    
    profile_photo_url = serializers.SerializerMethodField()
    ol_results = serializers.SerializerMethodField()
    al_results = serializers.SerializerMethodField()
    
    class Meta:
        model = GraduatedStudent
        fields = [
            'id',
            'student_id',
            # Student identification
            'registration_no',
            'district_code',
            'course_code',
            'batch',
            'batch_code',
            'batch_display',
            'batch_name',
            'batch_year',
            'student_number',
            'registration_year',
            # Personal information
            'full_name_english',
            'full_name_sinhala',
            'name_with_initials',
            'gender',
            'date_of_birth',
            'nic_id',
            # Address
            'address_line',
            'district',
            'divisional_secretariat',
            'grama_niladhari_division',
            'village',
            'marital_status',
            # Contact
            'mobile_no',
            'email',
            # Training
            'training_received',
            'training_provider',
            'course_vocation_name',
            'training_duration',
            'training_nature',
            'training_establishment',
            'training_placement_preference',
            # Center and course
            'center',
            'center_name',
            'course',
            'course_name',
            # Enrollment
            'enrollment_date',
            'enrollment_status',
            'date_of_application',
            # Profile
            'profile_photo_url',
            'ol_results',
            'al_results',
            # Graduation details
            'graduate_education',
            'workplace',
            'job_description',
            'is_complete',
            'has_education',
            'has_workplace',
        ]
    
    def get_center_name(self, obj):
        return obj.student.center.name if obj.student.center else None

    def get_course_name(self, obj):
        return obj.student.course.name if obj.student.course else None

    def get_batch_name(self, obj):
        return obj.student.batch.batch_name if obj.student.batch else None

    def get_batch_code(self, obj):
        return obj.student.batch.batch_code if obj.student.batch else None

    def get_batch_display(self, obj):
        return obj.student.batch.batch_name if obj.student.batch else None
    
    def get_profile_photo_url(self, obj):
        if obj.student.profile_photo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.student.profile_photo.url)
        return None
    
    def get_ol_results(self, obj):
        qualifications = EducationalQualification.objects.filter(student=obj.student, type='OL')
        return [{
            'id': q.id,
            'subject': q.subject,
            'grade': q.grade,
            'year': q.year,
            'type': q.type
        } for q in qualifications]
    
    def get_al_results(self, obj):
        qualifications = EducationalQualification.objects.filter(student=obj.student, type='AL')
        return [{
            'id': q.id,
            'subject': q.subject,
            'grade': q.grade,
            'year': q.year,
            'type': q.type
        } for q in qualifications]
