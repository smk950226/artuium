from django.db import models
from ckeditor.fields import RichTextField

class HomeRedirectURL(models.Model):
    url = models.URLField('URL')

    def __str__(self):
        return  self.url
    
    class Meta:
        ordering = ['-id']
        verbose_name = '홈 Redirect URL'
        verbose_name_plural = '홈 Redirect URL'