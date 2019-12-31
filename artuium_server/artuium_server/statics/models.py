from django.db import models

class Notice(models.Model):
    title = models.CharField('제목', max_length = 500)
    date = models.DateTimeField('작성일', auto_now_add = True)
    content = models.TextField('내용')
    image = models.ImageField('이미지', upload_to = 'notice/image/', blank = True, null = True)
    is_banner = models.BooleanField('배너 여부')

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-date']
        verbose_name = '공지사항'
        verbose_name_plural = '공지사항'


class Review(models.Model):
    author = models.ForeignKey('users.User', on_delete = models.CASCADE, related_name = 'reviews')
    time = models.DateTimeField('작성일', auto_now_add = True)
    content = models.TextField('내용')
    exhibition = models.ForeignKey('exhibition.Exhibition', on_delete = models.CASCADE, blank = True, null = True, related_name = 'reviews')
    artwork = models.ForeignKey('artwork.Artwork', on_delete = models.CASCADE, blank = True, null = True, related_name = 'reviews')
    rate = models.FloatField('평점')
    expression = models.CharField(max_length = 100, choices = (
        ('good', 'Good'),
        ('soso', 'Soso'),
        ('sad', 'Sad'),
        ('surprise', 'Surprise'),
        ('thumb', 'Thumb'),
    ))
    recommended = models.BooleanField('추천 여부', default = False)

    def __str__(self):
        return self.author.nickname + '-' + str(self.rate)
    
    class Meta:
        ordering = ['-id']
        verbose_name = '리뷰'
        verbose_name_plural = '리뷰'
    
    @property
    def reply_count(self):
        return self.replies.all().count()
    
    @property
    def like_count(self):
        return self.likes.all().count()


class Reply(models.Model):
    review = models.ForeignKey(Review, on_delete = models.CASCADE, related_name = 'replies', blank = True, null = True)
    author = models.ForeignKey('users.User', on_delete = models.CASCADE, related_name = 'replies')
    time = models.DateTimeField('작성일', auto_now_add = True)
    content = models.TextField('내용')    
    replies = models.ManyToManyField('self', blank = True, null = True)

    def __str__(self):
        return  'reply-' + self.author.nickname
    
    class Meta:
        ordering = ['-id']
        verbose_name = '답변'
        verbose_name_plural = '답변'


class Like(models.Model):
    user = models.ForeignKey('users.User', on_delete = models.CASCADE, related_name = 'likes')
    review = models.ForeignKey(Review, on_delete = models.CASCADE, blank = True, null = True, related_name = 'likes')
    artwork = models.ForeignKey('artwork.Artwork', on_delete = models.CASCADE, blank = True, null = True, related_name = 'likes')
    exhibition = models.ForeignKey('exhibition.Exhibition', on_delete = models.CASCADE, blank = True, null = True, related_name = 'likes')
    time = models.DateTimeField('작성일', auto_now_add = True)

    def __str__(self):
        return  'like-' + self.user.nickname
    
    class Meta:
        ordering = ['-id']
        verbose_name = '좋아요'
        verbose_name_plural = '좋아요'


class Follow(models.Model):
    following = models.ForeignKey('users.User', on_delete = models.CASCADE, related_name = 'following')
    follower = models.ForeignKey('users.User', on_delete = models.CASCADE, related_name = 'follower')

    def __str__(self):
        return  self.following.nickname + ' > ' + self.follower.nickname
    
    class Meta:
        ordering = ['-id']
        verbose_name = '팔로우'
        verbose_name_plural = '팔로우'


class NoticeCheck(models.Model):
    user = models.ForeignKey('users.User', on_delete = models.CASCADE, related_name = 'checked_notices')
    notice = models.ForeignKey(Notice, on_delete = models.CASCADE, related_name = 'checked_notices')
    date = models.DateTimeField('Checked Time', auto_now_add = True)

    def __str__(self):
        return  self.user.nickname + ' - ' + self.notice.title
    
    class Meta:
        ordering = ['-id']
        verbose_name = '공지 확인 여부'
        verbose_name_plural = '공지 확인 여부'


class Notification(models.Model):
    from_user = models.ForeignKey('users.User', on_delete = models.CASCADE, related_name = 'from_notifications')
    to_user = models.ForeignKey('users.User', on_delete = models.CASCADE, related_name = 'to_notifications')
    type = models.CharField('알림 유형', max_length = 255, choices = (
        ('comment_review', 'Comment Review'),
        ('comment_reply', 'Comment Reply'),
        ('like_review', 'Like Review'),
        ('following', 'Following')
    ))
    review = models.ForeignKey(Review, on_delete = models.CASCADE, related_name = 'notifications', blank = True, null = True)
    reply = models.ForeignKey(Reply, on_delete = models.CASCADE, related_name = 'notifications', blank = True, null = True)
    date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return  self.from_user.nickname + ' -> ' + self.to_user.nickname
    
    class Meta:
        ordering = ['-id']
        verbose_name = '알림'
        verbose_name_plural = '알림'


class NotificationCheck(models.Model):
    user = models.ForeignKey('users.User', on_delete = models.CASCADE, related_name = 'checked_notifications')
    notification = models.ForeignKey(Notification, on_delete = models.CASCADE, related_name = 'checked_notifications')
    date = models.DateTimeField('Checked Time', auto_now_add = True)

    def __str__(self):
        return  self.user.nickname + ' - ' + str(self.notification.id)
    
    class Meta:
        ordering = ['-id']
        verbose_name = '알림 확인 여부'
        verbose_name_plural = '알림 확인 여부'