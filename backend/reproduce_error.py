
from users.models import User
from overview.views import InstructorOverviewView
from rest_framework.test import APIRequestFactory, force_authenticate
import traceback

def test_view():
    print("Starting test...")
    try:
        user = User.objects.get(username='Omesh')
        print(f"Testing with user: {user.username} (Role: {user.role})")
        
        factory = APIRequestFactory()
        view = InstructorOverviewView.as_view()
        request = factory.get('/api/overview/instructor/overview/')
        force_authenticate(request, user=user)
        
        response = view(request)
        print("Status Code:", response.status_code)
        if response.status_code != 200:
            print("Error Data:", response.data)
        else:
            print("Success Data Keys:", response.data.keys())
            
    except Exception as e:
        print("Exception caught during execution:")
        traceback.print_exc()

test_view()
