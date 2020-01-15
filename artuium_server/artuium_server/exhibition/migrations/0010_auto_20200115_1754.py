# Generated by Django 2.2.7 on 2020-01-15 08:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('exhibition', '0009_auto_20200115_1752'),
    ]

    operations = [
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=300, verbose_name='이름')),
            ],
            options={
                'verbose_name': '갤러리 지역',
                'verbose_name_plural': '갤러리 지역',
                'ordering': ['-id'],
            },
        ),
        migrations.AlterField(
            model_name='gallery',
            name='region',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='exhibition.Region', verbose_name='지역'),
        ),
    ]
