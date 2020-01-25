# Generated by Django 2.2.7 on 2020-01-22 09:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('statics', '0018_notice_index'),
    ]

    operations = [
        migrations.AddField(
            model_name='reporting',
            name='to_user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reporteds', to=settings.AUTH_USER_MODEL, verbose_name='신고당한 유저'),
        ),
        migrations.AlterField(
            model_name='reporting',
            name='review',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='statics.Review', verbose_name='신고당한 감상'),
        ),
        migrations.AlterField(
            model_name='reporting',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reportings', to=settings.AUTH_USER_MODEL, verbose_name='신고한 유저'),
        ),
    ]