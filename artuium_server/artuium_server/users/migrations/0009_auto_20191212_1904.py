# Generated by Django 2.2.7 on 2019-12-12 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_user_recommended'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='background_image',
            field=models.ImageField(blank=True, null=True, upload_to='user/background/', verbose_name='Background Image'),
        ),
    ]
