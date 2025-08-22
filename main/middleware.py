from django.utils import translation
from django.conf import settings

class LanguageMiddleware:
    """Middleware to activate language from session"""
    
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        # Get language from session
        session_language = request.session.get('django_language')
        
        if session_language and session_language in [lang[0] for lang in settings.LANGUAGES]:
            # Activate the language from session
            translation.activate(session_language)
            request.LANGUAGE_CODE = session_language
        else:
            # Use default language
            translation.activate(settings.LANGUAGE_CODE)
            request.LANGUAGE_CODE = settings.LANGUAGE_CODE
        
        response = self.get_response(request)
        return response
