# Generated by Django 2.2.7 on 2020-01-26 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_auto_20200101_1714'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='nickname',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='닉네임'),
        ),
    ]