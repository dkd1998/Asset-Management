from django.db import models
from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User 
from django.contrib.auth import authenticate
from .models import AssetRequest, Assets

User._meta.get_field('email')._unique = True
# User Serializer

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password',
                  'is_active', 'is_superuser')


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assets
        fields = '__all__'


class AssetRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetRequest
        fields = ('requestId', 'assetId', 'employeeId', 'description',
                  'requestStatus', 'requested_date', 'updated_date')
        requested_date = serializers.DateTimeField(format='%Y')
