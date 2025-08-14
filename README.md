# 🌾 PaddySense - AI-Powered Smart Farming Platform

**PaddySense** is an intelligent farming decision platform that transforms traditional farming into data-driven agriculture through AI-powered recommendations.

## 🚀 Features

### Core Features
- **🌱 Crop Monitoring**: Real-time tracking of crop health and growth
- **🌤️ Weather Intelligence**: Accurate forecasts and recommendations
- **📊 Data Analytics**: Comprehensive insights and reporting
- **🤖 AI Recommendations**: Smart suggestions for optimal farming
- **💧 Irrigation Management**: Automated water scheduling
- **🌿 Fertilizer Planning**: Optimized nutrient application

### Dashboard Features
- Real-time crop health monitoring
- Weather forecasting (4-day outlook)
- Soil temperature and moisture tracking
- Growth stage tracking
- Harvest countdown
- AI-powered farming recommendations

## 🛠️ Technology Stack

- **Backend**: Django 5.2.5
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: Bootstrap 4.6.2
- **Icons**: Font Awesome 5.15.4
- **Database**: SQLite (development), MySQL (production ready)
- **Python**: 3.8+

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Virtual environment (recommended)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Paddy
```

### 2. Create Virtual Environment
```bash
python -m venv PaddySense_env
```

### 3. Activate Virtual Environment

**Windows:**
```bash
PaddySense_env\Scripts\activate
```

**macOS/Linux:**
```bash
source PaddySense_env/bin/activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Run Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Start Development Server
```bash
python manage.py runserver
```

The application will be available at: http://127.0.0.1:8000/

## 📱 Available Pages

### Home Page (`/`)
- Welcome message and overview
- Feature highlights
- Quick stats and weather widget
- Navigation to other sections

### Dashboard (`/dashboard`)
- Comprehensive crop monitoring
- Real-time sensor data
- Weather forecasts
- AI recommendations
- Action buttons for farming tasks

### About (`/about`)
- Project mission and vision
- Key features overview
- Why choose PaddySense

### Contact (`/contact`)
- Contact form
- Company information
- Social media links

## 🗄️ Database Schema

The application uses Django's built-in models and can be extended with:

- **User Management**: Authentication and authorization
- **Crop Data**: Planting dates, varieties, growth stages
- **Sensor Data**: Temperature, moisture, soil conditions
- **Weather Data**: Forecasts and historical data
- **Recommendations**: AI-generated farming advice

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Database Configuration
The project is configured for SQLite by default. For production, update `settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'paddysense_db',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

## 🚀 Deployment

### Production Settings
1. Set `DEBUG = False` in `settings.py`
2. Configure production database
3. Set up static file serving
4. Configure web server (Nginx/Apache)
5. Use production WSGI server (Gunicorn/uWSGI)

### Docker Deployment
```bash
# Build image
docker build -t paddysense .

# Run container
docker run -p 8000:8000 paddysense
```

## 🧪 Testing

Run the test suite:
```bash
python manage.py test
```

Run with coverage:
```bash
coverage run --source='.' manage.py test
coverage report
```

## 📊 API Endpoints

The application provides RESTful API endpoints:

- `GET /api/crops/` - List all crops
- `GET /api/crops/{id}/` - Get crop details
- `POST /api/crops/` - Create new crop
- `PUT /api/crops/{id}/` - Update crop
- `DELETE /api/crops/{id}/` - Delete crop

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Django community for the excellent framework
- Bootstrap team for the responsive CSS framework
- Font Awesome for the beautiful icons
- All contributors and supporters

## 📞 Support

- **Email**: info@paddysense.com
- **Documentation**: [docs.paddysense.com](https://docs.paddysense.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/paddysense/issues)

## 🔮 Future Roadmap

- [ ] Mobile app (iOS/Android)
- [ ] IoT sensor integration
- [ ] Machine learning models
- [ ] Satellite imagery analysis
- [ ] Market price predictions
- [ ] Community farming features
- [ ] Multi-language support

---

**Made with ❤️ for the farming community**

*PaddySense - Transforming Agriculture Through Technology*



