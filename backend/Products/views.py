from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated

class ProductView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        try:
            if pk:
                product = Product.objects.get(pk=pk)
                serializer = ProductSerializer(product)
                return Response({
                    "product": serializer.data,
                    "success": True
                }, status=status.HTTP_200_OK)
            else:
                products = Product.objects.all()
                serializer = ProductSerializer(products, many=True)
                return Response({
                    "products": serializer.data,
                "success": True
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "error": str(e),
                "success": False
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def post(self, request):
        try:
            name = request.data.get("name")
            price = request.data.get("price")
            category = request.data.get("category")
            description = request.data.get("description")

            if not name or not price or not category or not description:
                return Response({
                    "error": "All fields are required",
                    "success": False
                }, status=status.HTTP_400_BAD_REQUEST)

            serializer = ProductSerializer(data={
                "name": name,
                "price": price,
                "category": category,
                "description": description
            })
            
            if not serializer.is_valid():   
                return Response({
                    "error": serializer.errors,
                    "success": False
                }, status=status.HTTP_400_BAD_REQUEST)
        
            serializer.save()

            return Response({
                "message": "Product created successfully",
                "success": True
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                "error": str(e),
                "success": False
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def put(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)

            name = request.data.get("name")
            price = request.data.get("price")
            category = request.data.get("category")
            description = request.data.get("description")

            if not name or not price or not category or not description:
                return Response({
                    "error": "All fields are required",
                    "success": False
                }, status=status.HTTP_400_BAD_REQUEST)

            serializer = ProductSerializer(product, data={
                "name": name,
                "price": price,
                "category": category,
                "description": description
            })

            if not serializer.is_valid():
                return Response({
                    "error": serializer.errors,
                    "success": False
                }, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()

            return Response({
                "message": "Product updated successfully",
                "success": True
            }, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({
                "error": "Product not found",
                "success": False
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                "error": str(e),
                "success": False
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            product.delete()
            return Response({
                "message": "Product deleted successfully",
                "success": True
            }, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({
                "error": "Product not found",
                "success": False
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                "error": str(e),
                "success": False
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)