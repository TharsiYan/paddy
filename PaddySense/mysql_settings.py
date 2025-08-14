# MySQL Database Configuration for PaddySense
# To use MySQL, replace the DATABASES setting in settings.py with this:

MYSQL_DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'paddysense_db',
        'USER': 'root',
        'PASSWORD': 'your_password_here',  # Change this to your actual MySQL password
        'HOST': 'localhost',
        'PORT': '3306',
        'OPTIONS': {
            'charset': 'utf8mb4',
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}

# Usage:
# 1. Update the password above
# 2. In settings.py, replace the DATABASES setting with:
#    from .mysql_settings import MYSQL_DATABASES
#    DATABASES = MYSQL_DATABASES
# 3. Run: python manage.py migrate



