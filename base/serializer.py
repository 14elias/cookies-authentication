from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User

class RegisterSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=['username','email','password']
    
    def create(self, validated_data):
        user=User(username=validated_data['username'],email=validated_data['email'])
        password=validated_data['password']
        user.set_password(password)
        user.save()
        return user