from os import environ
from os import urandom

class Config:
    SQLALCHEMY_DATABASE_URI = environ.get('DATABASE_URL')
    SECRET_KEY = urandom(42).hex()
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_SECURE = False
    SESSION_COOKIE_SAMESITE = 'None'
    CSRF_COOKIE_SAMESITE = 'None'
    SESSION_COOKIE_HTTPONLY = True
    WTF_CSRF_ENABLED = True