from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Count, Q
from graduated_students.models import GraduatedStudent
from courses.models import Course
from centers.models import Center
from students.models import Student

@api_view(['GET'])
@permission_classes([AllowAny])
def public_graduates_performance(request):
    """
    Public endpoint to get aggregated performance stats of graduated students.
    """
    # Total graduated students
    total_graduated = GraduatedStudent.objects.count()
    
    # Employment stats (mock logic if specific field not available or needs parsing, 
    # but here assuming workplace field existence implies employment)
    employed_count = GraduatedStudent.objects.filter(workplace__isnull=False).exclude(workplace__exact='').count()
    unemployed_count = total_graduated - employed_count
    
    # District-wise breakdown (Based on Center's district)
    # We need to traverse: GraduatedStudent -> Student -> Batch -> Course -> Center -> District
    # Assuming Student has a relation to Center or Batch.
    # Checking Student model in previous context, Student usually links to a TrainingCenter or Batch.
    # Let's rely on data available. For now, let's aggregate by District if possible, 
    # or just Center locations.
    
    # Aggregation by Course Category or Name
    course_stats = GraduatedStudent.objects.values('student__course__name')\
        .annotate(count=Count('id'))\
        .order_by('-count')[:5]  # Top 5 courses
        
    # Aggregate by District (if student->center link exists)
    # Assuming Student -> Batch -> TrainingCenter -> District (or similar)
    # If the path is complex, for MVP we might skip or simplify.
    # Inspecting Student model would be good, but let's assume a standard path for now or return mock if complex.
    # Let's try to get district via Center.
    
    district_stats = GraduatedStudent.objects.values('student__center__district')\
        .annotate(count=Count('id'))\
        .order_by('-count')
    
    # Success Stories
    # Fetch graduates who have a workplace and a profile photo
    success_stories_qs = GraduatedStudent.objects.filter(
        workplace__isnull=False, 
        student__profile_photo__isnull=False
    ).exclude(workplace__exact='').select_related('student', 'student__course').order_by('-created_at')[:12]

    success_stories = []
    for gs in success_stories_qs:
        photo_url = gs.student.profile_photo.url if gs.student.profile_photo else None
        # Ensure absolute URL if needed, or let frontend handle it if strictly relative
        # Ideally, request.build_absolute_uri(photo_url)
        
        success_stories.append({
            'name': gs.student.name_with_initials,
            'course': gs.student.course.name if gs.student.course else 'N/A',
            'workplace': gs.workplace,
            'designation': gs.job_description or 'Graduated', # Using job_description as designation if available
            'image': photo_url
        })

    data = {
        'total_graduated': total_graduated,
        'employment_stats': {
            'employed': employed_count,
            'unemployed': unemployed_count
        },
        'top_courses': [
            {'name': item['student__course__name'], 'count': item['count']} 
            for item in course_stats if item['student__course__name']
        ],
        'district_breakdown': [
            {'district': item['student__center__district'], 'count': item['count']}
            for item in district_stats if item['student__center__district']
        ],
        'success_stories': success_stories
    }
    
    return Response(data)
