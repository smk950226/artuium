# Generated by Django 2.2.7 on 2020-01-26 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('statics', '0021_auto_20200126_1710'),
    ]

    operations = [
        migrations.AddField(
            model_name='reply',
            name='deleted',
            field=models.BooleanField(default=False, verbose_name='목록 삭제 여부'),
        ),
    ]
