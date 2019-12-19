from django.db import models

class Gallery(models.Model):
    name = models.CharField('이름', max_length = 300)
    location = models.CharField('위치', max_length = 500)

    def __str__(self):
        return  self.name
    
    class Meta:
        ordering = ['-id']
        verbose_name = '갤러리'
        verbose_name_plural = '갤러리'


class Exhibition(models.Model):
    name = models.CharField('이름', max_length = 500)
    content = models.TextField('내용')
    open_date = models.DateField()
    close_date = models.DateField()
    open_time = models.TimeField()
    close_time = models.TimeField()
    notopendate = models.DateField(blank = True, null = True)
    region = models.CharField('지역', max_length = 255)
    address = models.CharField('주소', max_length = 500)
    scale = models.CharField('규모', choices = (('중대형', '중대형'), ('소형', '소형')), max_length = 500)
    fee = models.FloatField('요금')
    artists = models.ManyToManyField('artwork.Artist', related_name = 'exhibitions')
    artworks = models.ManyToManyField('artwork.Artwork', related_name = 'exhibitions')
    gallery = models.ForeignKey(Gallery, on_delete = models.CASCADE, related_name = 'exhibitions')
    recommended = models.BooleanField('추천 여부', default = False)

    def __str__(self):
        return  self.name
    
    class Meta:
        ordering = ['-id']
        verbose_name = '전시'
        verbose_name_plural = '전시'
    
    @property
    def review_count(self):
        return self.reviews.all().count()
    
    @property
    def like_count(self):
        return self.likes.all().count()
    
    @property
    def total_rate(self):
        reviews = self.reviews.all()
        if reviews.count() == 0:
            return 0
        else:
            total = 0
            for review in reviews:
                total += review.rate
            return total/reviews.count()


class ExhibitionImage(models.Model):
    exhibition = models.ForeignKey(Exhibition, on_delete = models.CASCADE, related_name = 'images')
    image = models.ImageField(upload_to = 'exhibition/image/')

    def __str__(self):
        return  self.exhibition.name + '-image-' + str(self.id)
    
    class Meta:
        ordering = ['-id']
        verbose_name = '전시 이미지'
        verbose_name_plural = '전시 이미지'