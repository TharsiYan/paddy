@echo off
echo Starting PaddySense Django Project...
echo.

REM Activate virtual environment
call PaddySense_env\Scripts\activate.bat

REM Run Django development server
python manage.py runserver

pause



