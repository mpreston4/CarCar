# Generated by Django 4.0.3 on 2023-04-28 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0010_remove_automobilevo_sold'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='sold',
            field=models.BooleanField(default=False),
        ),
    ]