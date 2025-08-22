# 🌾 PaddySense - Intelligent Farming Platform

A Django-based web application that provides AI-driven insights, real-time monitoring, and data-driven recommendations for optimal crop management. The application supports both English and Tamil languages.

## 🚀 Features

- **Crop Monitoring Dashboard**: Real-time monitoring of crop health, growth stages, and environmental conditions
- **Weather Insights**: Real-time weather data and forecasts to optimize farming decisions
- **Data Analytics**: Comprehensive analytics and performance metrics for your farm
- **AI Recommendations**: AI-powered suggestions for optimal crop management and yield improvement
- **Bilingual Support**: Full support for English and Tamil languages
- **Responsive Design**: Mobile-friendly interface for field use
- **Real-time Updates**: Live data updates and notifications

## 🛠️ Technology Stack

- **Backend**: Django 5.2.5
- **Frontend**: Bootstrap 4, HTML5, CSS3, JavaScript
- **Database**: SQLite (development), MySQL (production ready)
- **Language Support**: Django i18n with custom translation tags
- **Static Files**: Django static files with CDN support

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Virtual environment (recommended)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Paddy
   ```

2. **Create and activate virtual environment**
   ```bash
   # Windows
   python -m venv PaddySense_env
   PaddySense_env\Scripts\Activate.ps1
   
   # Linux/Mac
   python3 -m venv PaddySense_env
   source PaddySense_env/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Collect static files**
   ```bash
   python manage.py collectstatic
   ```

## 🚀 Running the Application

1. **Start the development server**
   ```bash
   python manage.py runserver
   ```

2. **Open your browser**
   - Navigate to `http://127.0.0.1:8000/`
   - Admin interface: `http://127.0.0.1:8000/admin/`

## 🌐 Language Support

The application supports two languages:
- **English (en)**: Default language
- **Tamil (ta)**: Full translation support

### Switching Languages
- Use the language dropdown in the navigation bar
- Languages are stored in session and persist across page visits
- All text content is automatically translated

## 📱 Mobile Access

The application is fully responsive and optimized for mobile devices:
- Touch-friendly interface
- Responsive navigation
- Mobile-optimized forms and buttons
- Field-ready design for agricultural use

## 🧪 Testing

Run the comprehensive test suite to verify functionality:
```bash
python test_functionality.py
```

This will test:
- URL accessibility
- Template rendering
- Static file serving
- Custom template tags
- Language switching
- Database operations

## 📁 Project Structure

```
Paddy/
├── PaddySense/          # Django project settings
├── main/                # Main application
│   ├── views.py        # View functions
│   ├── urls.py         # URL routing
│   ├── models.py       # Database models
│   └── templatetags/   # Custom template tags
├── templates/           # HTML templates
├── static/             # Static files (CSS, JS, images)
├── locale/             # Translation files
├── requirements.txt    # Python dependencies
└── manage.py          # Django management script
```

## 🔑 Admin Access

- **Username**: admin
- **Password**: admin123 (change this in production!)
- **URL**: `/admin/`

## 🚀 Production Deployment

For production deployment:

1. **Update settings.py**
   - Set `DEBUG = False`
   - Configure `ALLOWED_HOSTS`
   - Set `SECRET_KEY` environment variable

2. **Database configuration**
   - Update `DATABASES` setting for your production database
   - Run `python manage.py migrate`

3. **Static files**
   - Run `python manage.py collectstatic`
   - Configure your web server to serve static files

4. **Security**
   - Change admin password
   - Configure HTTPS
   - Set up proper firewall rules

## 🐛 Troubleshooting

### Common Issues

1. **ModuleNotFoundError: No module named 'django'**
   - Activate your virtual environment
   - Install requirements: `pip install -r requirements.txt`

2. **Template does not exist**
   - Check template file paths
   - Verify `TEMPLATES` setting in `settings.py`

3. **Static files not loading**
   - Run `python manage.py collectstatic`
   - Check `STATIC_URL` and `STATICFILES_DIRS` settings

4. **Language switching not working**
   - Verify `LocaleMiddleware` is in `MIDDLEWARE`
   - Check `LANGUAGES` and `LOCALE_PATHS` settings

### Getting Help

- Check Django logs in the terminal
- Verify all dependencies are installed
- Ensure virtual environment is activated
- Check file permissions and paths

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**PaddySense** - Empowering farmers with intelligent technology for better crop management and higher yields. 🌾✨



