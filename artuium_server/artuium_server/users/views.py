from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

from . import models, serializers
from artuium_server.statics import models as statics_models

User = get_user_model()

class Follow(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        user = request.user

        user_id = request.data.get('userId', None)
        if user_id:
            try:
                follow_user = User.objects.get(id = user_id)
                follow = statics_models.Follow.objects.filter(following = user, follower = follow_user)
                if follow.count() > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 팔로잉하는 회원입니다.'})
                else:
                    follow = statics_models.Follow.objects.create(following = user, follower = follow_user)
                    follow.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '회원이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '회원을 선택해주세요.'})
    
    def delete(self, request, format = None):
        user = request.user

        user_id = request.data.get('userId', None)
        if user_id:
            try:
                follow_user = User.objects.get(id = user_id)
                follow = statics_models.Follow.objects.filter(following = user, follower = follow_user)
                if follow.count() > 0:
                    follow.delete()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                else:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '팔로잉하지 않는 회원입니다.'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '회원이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '회원을 선택해주세요.'})