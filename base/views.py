from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.request import Request
from .serializer import RegisterSerializer
from django.contrib.auth.models import User

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response('Authenticated')

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request:Request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            token=response.data

            access_token=token['access']
            refresh_token=token['refresh']

            res=Response({'success':True})

            res.set_cookie(
                key='access_token',
                value=access_token,
                samesite='None',
                path='/',
                secure=True,
                httponly=True,
            )
            res.set_cookie(
                key='refresh_token',
                value=refresh_token,
                samesite='None',
                path='/',
                secure=True,
                httponly=True
            )
            return res
        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=500)
        
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if not refresh_token:
                return Response({'error': 'Refresh token not provided'}, status=400)

            try:
                refresh = RefreshToken(refresh_token)
                print(refresh.payload)
                user_id = refresh.payload.get('user_id')  
                user = User.objects.get(id=user_id)  
            except Exception as e:
                return Response({'error': f'Invalid refresh token: {str(e)}'}, status=400)

            new_refresh_token = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            res = Response({'success': True})

            res.set_cookie(
                key='access_token',
                value=access_token,
                path='/',
                samesite='None',
                httponly=True,
                secure=True
            )

            res.set_cookie(
                key='refresh_token',
                value=str(new_refresh_token),
                path='/',
                samesite='None',
                httponly=True,
                secure=True
            )

            refresh.blacklist()

            return res

        except Exception as e:
            # Log detailed error
            return Response({'success': False, 'error': str(e)}, status=500)


@api_view(['POST'])
def register(request):
    serializer=RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token=request.COOKIES.get('refresh_token')
        if refresh_token:
            try:
                token=RefreshToken(refresh_token)
                token.blacklist()
            except Exception as e:
                return Response({'success': False, 'error': str(e)},status=400)
        res=Response({'success':True})
        res.delete_cookie(
            key='access_token',
            path='/',
        )
        res.delete_cookie(
            key='refresh_token',
            path='/'
        )
        return res
    except Exception as e:
        return Response({'success': False, 'error': str(e)}, status=500) 