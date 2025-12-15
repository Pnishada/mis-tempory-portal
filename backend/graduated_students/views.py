from rest_framework import viewsets, filters, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import GraduatedStudent
from .serializers import GraduatedStudentSerializer, GraduatedStudentListSerializer, StudentBasicSerializer
from students.models import Student


class GraduatedStudentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing graduated students.
    Provides CRUD operations and filtering capabilities.
    Role-based access:
    - Admin (Head Office): view all
    - District Manager: view only their district
    """
    queryset = GraduatedStudent.objects.select_related(
        'student',
        'student__center',
        'student__course',
        'student__batch'
    ).all()
    serializer_class = GraduatedStudentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['student__course', 'student__center', 'student__district', 'student__registration_year']
    search_fields = [
        'student__full_name_english',
        'student__registration_no',
        'graduate_education',
        'workplace'
    ]
    ordering_fields = ['created_at', 'updated_at', 'student__registration_no']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """
        Filter queryset based on user role.
        District Manager -> Only their district
        Admin/Head Office -> All
        """
        user = self.request.user
        queryset = super().get_queryset()
        
        if user.role == 'district_manager' and user.district:
            return queryset.filter(student__district__iexact=user.district)
            
        return queryset

    def get_serializer_class(self):
        """Use list serializer for list action, detail serializer for others"""
        if self.action == 'list':
            return GraduatedStudentListSerializer
        return GraduatedStudentSerializer
    
    def create(self, request, *args, **kwargs):
        """Create a new graduated student record"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Check if student already has a graduation record
        student_id = serializer.validated_data['student'].id
        if GraduatedStudent.objects.filter(student_id=student_id).exists():
            return Response(
                {'error': 'This student already has a graduation record.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def update(self, request, *args, **kwargs):
        """Update graduated student information"""
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get statistics about graduated students (respecting filters)"""
        queryset = self.get_queryset() # Use filtered queryset
        
        total = queryset.count()
        with_education = queryset.filter(graduate_education__isnull=False).exclude(graduate_education='').count()
        with_workplace = queryset.filter(workplace__isnull=False).exclude(workplace='').count()
        complete = queryset.filter(
            graduate_education__isnull=False,
            workplace__isnull=False
        ).exclude(graduate_education='').exclude(workplace='').count()
        
        return Response({
            'total': total,
            'with_education': with_education,
            'with_workplace': with_workplace,
            'complete': complete,
            'incomplete': total - complete,
        })
    
    @action(detail=False, methods=['get'])
    def completed_students(self, request):
        """Get list of completed students who are eligible for graduation tracking"""
        user = request.user
        
        completed_students = Student.objects.filter(
            enrollment_status='Completed'
        ).exclude(
            graduation_info__isnull=False
        ).select_related('center', 'course', 'batch')
        
        # Filter by district for District Managers
        if user.role == 'district_manager' and user.district:
            completed_students = completed_students.filter(district__iexact=user.district)
        
        serializer = StudentBasicSerializer(completed_students, many=True, context={'request': request})
        return Response(serializer.data)
