# Generated by Django 3.2.8 on 2021-10-19 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AssetManagement', '0013_alter_assetrequest_requeststatus'),
    ]

    operations = [
        migrations.AddField(
            model_name='assets',
            name='quantity',
            field=models.IntegerField(default=0),
        ),
    ]
