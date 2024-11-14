from os import environ, urandom
from datetime import timedelta
from constants import SESSION_LIFETIME, SECRET_KEY_INT

class Config:
    SQLALCHEMY_DATABASE_URI = environ.get('DATABASE_URL')
    SECRET_KEY = urandom(SECRET_KEY_INT).hex()
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_SECURE = False
    SESSION_COOKIE_SAMESITE = 'Lax'
    CSRF_COOKIE_SAMESITE = 'Lax'
    SESSION_COOKIE_HTTPONLY=True
    WTF_CSRF_ENABLED = True
    SESSION_PERMANENT = True
    PERMANENT_SESSION_LIFETIME = timedelta(days=SESSION_LIFETIME)
    SESSION_TYPE = 'sqlalchemy'