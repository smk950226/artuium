from django.db import models


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
    content = models.TextField()

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-id']
        verbose_name = '아트워크'
        verbose_name_plural = '아트워크'