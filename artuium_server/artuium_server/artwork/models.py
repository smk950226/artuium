from django.db import models
from ckeditor.fields import RichTextField

class Artist(models.Model):
    name = models.CharField('이름', max_length = 255)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-id']
        verbose_name = '아티스트'
        verbose_name_plural = '아티스트'


class Artwork(models.Model):
    name = models.CharField('이름', max_length = 255)
    image = models.ImageField('이미지', upload_to = 'artwork/image/')
    author = models.ForeignKey(Artist, on_delete = models.CASCADE, blank = True, null = True, related_name = 'artworks')
    created = models.DateField('작품 날짜')
    material = models.CharField(max_length = 500)
    content = RichTextField()

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-id']
        verbose_name = '아트워크'
        verbose_name_plural = '아트워크'

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
    
    @property
    def size(self):
        if self.image.width > self.image.height:
            return 'horizontal'
        elif self.image.width == self.image.height:
            return 'square'
        else:
            return 'vertical'