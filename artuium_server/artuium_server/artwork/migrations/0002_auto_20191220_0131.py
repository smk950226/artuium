# Generated by Django 2.2.7 on 2019-12-19 16:31

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('artwork', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artwork',
            name='content',
            field=ckeditor.fields.RichTextField(),
        ),
    ]