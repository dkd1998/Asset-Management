from django.contrib.auth.models import User
from rest_framework import generics, mixins, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import *
from django.contrib.auth import login
from rest_framework.decorators import api_view
from .models import AssetRequest, Assets
from knox.auth import TokenAuthentication
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save
from django.core.mail import EmailMessage, mail_admins
import django.dispatch


# after login, to view user details
class UserAPIView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# ------------------------------------------------------x

# Register API

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# ------------------------------------------------------x

# before storing the user in model the user is made inactive to prevent login
@receiver(pre_save, sender=User)
def set_new_user_inactive(sender, instance, **kwargs):
    if instance._state.adding is True:
        print("Creating Inactive User")
        instance.is_active = False
    else:
        print("Updating User Record")

# ------------------------------------------------------x

class ActivateUser(generics.GenericAPIView,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.RetrieveModelMixin):

    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'id'
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, id):
        return self.retrieve(request, id)

    def put(self, request, id=None):
        return self.update(request, id)

    def delete(self, request, id):
        return self.destroy(request, id)

# ------------------------------------------------------x

# once is_active is marked True only then the user will be able to login

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# ------------------------------------------------------x

# all users can see assets

class AssetsView(generics.GenericAPIView,
                 mixins.ListModelMixin,
                 mixins.CreateModelMixin,
                 mixins.RetrieveModelMixin):

    serializer_class = AssetSerializer
    queryset = Assets.objects.all()
    lookup_field = 'id'
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)

        else:
            return self.list(request)

    def post(self, request):
        return self.create(request)


class AssetView(generics.GenericAPIView,
                mixins.ListModelMixin,
                mixins.UpdateModelMixin,
                mixins.DestroyModelMixin,
                mixins.CreateModelMixin,
                mixins.RetrieveModelMixin):

    serializer_class = AssetSerializer
    queryset = Assets.objects.all()
    lookup_field = 'id'
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        return self.retrieve(request, id)

    def delete(self, request ,id):
        return self.destroy(request,id)
    

    def put(self, request, id):
        return self.update(request, id)


# ------------------------------------------------------x

# only the admin can see all the requests


class AssetRequestView(generics.GenericAPIView,
                       mixins.ListModelMixin,
                       mixins.RetrieveModelMixin):

    serializer_class = AssetRequestSerializer
    queryset = AssetRequest.objects.all()
    lookup_field = 'id'
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)

        else:
            return self.list(request)

# ------------------------------------------------------x

# all users can create an asset request


class CreateAssetRequestView(generics.GenericAPIView,
                             mixins.CreateModelMixin):

    serializer_class = AssetRequestSerializer
    queryset = AssetRequest.objects.all()
    lookup_field = 'id'
    #permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        return self.create(request)


# ------------------------------------------------------x

# only admin can update the request status to approve the asset request
class ApproveAssetRequest(generics.GenericAPIView,
                          mixins.UpdateModelMixin,
                          mixins.RetrieveModelMixin):

    serializer_class = AssetRequestSerializer
    queryset = AssetRequest.objects.all()
    lookup_field = 'requestId'
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, requestId):
        return self.retrieve(request, requestId)

    def put(self, request, requestId=None):
        return self.update(request, requestId)

# ------------------------------------------------------x

# Show all requests made by user


class AssetRequestByUser(generics.GenericAPIView,
                         mixins.UpdateModelMixin,
                         mixins.RetrieveModelMixin):

    serializer_class = AssetRequestSerializer
    queryset = AssetRequest.objects.all()
    lookup_field = 'employeeId'
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, employeeId):
        return self.retrieve(request, employeeId)

# ------------------------------------------------------x


class AllUsersView(generics.GenericAPIView,
                   mixins.ListModelMixin,
                   mixins.RetrieveModelMixin):

    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'id'
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        return self.list(request)

# ------------------------------------------------------x
