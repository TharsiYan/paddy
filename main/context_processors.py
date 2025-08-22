from django.utils import translation
from django.conf import settings
from .translations import get_translation

def language_context(request):
    """Context processor to provide language information"""
    # Get language from session first
    session_language = request.session.get('django_language')
    if session_language:
        current_language = session_language
    else:
        current_language = translation.get_language()
    
    return {
        'current_language': current_language,
        'available_languages': settings.LANGUAGES,
        'LANGUAGE_CODE': current_language,
        'get_translation': lambda text: get_translation(text, current_language),
        'request': request,  # Make request available in templates
    }
