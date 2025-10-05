from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from django.contrib.auth import authenticate
from .serializers import *

class RegisterView(APIView):
    def post(self, request):
        try:
            username = request.data.get("username")
            password = request.data.get("password")
            email = request.data.get("email")
            first_name = request.data.get("first_name")
            last_name = request.data.get("last_name")


            if not username or not password or not email or not first_name:
                return Response({
                    "error": "All fields are required", 
                    "success": False
                }, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(username=username).exists():
                return Response({
                    "error": "Username already exists", 
                    "success": False
                }, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(email=email).exists():
                return Response({
                    "error": "Email already exists", 
                    "success": False
                }, status=status.HTTP_400_BAD_REQUEST)

            user = User.objects.create_user(username=username, email=email, first_name=first_name, last_name=last_name)
            user.set_password(password)
            user.save()

            return Response({
                "message": "User registered successfully", 
                "success": True
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                "error": str(e), 
                "success": False
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    def post(self, request):
        try:
            user = CustomToken_Serializer(data=request.data)

            if not user.is_valid():
                return Response({
                    "error": "Invalid credentials", 
                    "success": False
                }, status=status.HTTP_401_UNAUTHORIZED)

            return Response({
                "message": "Login successful", 
                "success": True,
                "data": user.validated_data
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                "error": str(e), 
                "success": False
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)