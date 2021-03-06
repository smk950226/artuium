# Generated by Django 2.2.7 on 2019-12-08 09:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('statics', '0004_follow'),
    ]

    operations = [
        migrations.CreateModel(
            name='NoticeCheck',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='Checked Time')),
                ('notice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='checked_notices', to='statics.Notice')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='checked_notices', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': '공지 확인 여부',
                'verbose_name_plural': '공지 확인 여부',
                'ordering': ['-id'],
            },
        ),
    ]
