from django.db import models
from ckeditor.fields import RichTextField

class Region(models.Model):
    name = models.CharField('이름', max_length = 300)

    def __str__(self):
        return  self.name
    
    class Meta:
        ordering = ['-id']
        verbose_name = '갤러리 지역'
        verbose_name_plural = '갤러리 지역'


class Gallery(models.Model):
    name = models.CharField('이름', max_length = 300)
    location = models.CharField('위치', max_length = 500)
    region = models.ForeignKey(Region, verbose_name = '지역', on_delete = models.CASCADE, blank = True, null = True)
    address = models.CharField('주소', max_length = 500, blank = True, null = True)
    scale = models.CharField('규모', choices = (('중대형', '중대형'), ('소형', '소형')), max_length = 500, blank = True, null = True)
    website = models.CharField('웹 사이트', max_length = 500, blank = True, null = True)

    def __str__(self):
        return  self.name
    
    class Meta:
        ordering = ['-id']
        verbose_name = '갤러리'
        verbose_name_plural = '갤러리'


class Exhibition(models.Model):
    name = models.CharField('이름', max_length = 500)
    content = RichTextField('내용')
    open_date = models.DateField()
    close_date = models.DateField()
    open_time = models.TimeField()
    close_time = models.TimeField()
    notopendate = models.CharField(blank = True, null = True, max_length = 500)
    fee = models.TextField('요금')
    artists = models.ManyToManyField('artwork.Artist', related_name = 'exhibitions')
    artworks = models.ManyToManyField('artwork.Artwork', related_name = 'exhibitions')
    gallery = models.ForeignKey(Gallery, on_delete = models.CASCADE, related_name = 'exhibitions')
    recommended = models.BooleanField('추천 여부', default = False)
    index = models.PositiveIntegerField('순서', default = 1)

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

    @property
    def size(self):
        if self.image.width > self.image.height:
            return 'horizontal'
        elif self.image.width == self.image.height:
            return 'square'
        else:
            return 'vertical'