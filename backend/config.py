from datetime import timedelta
from constants import SESSION_LIFETIME

class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:postgres@database-1.cdycyi2c6ez2.us-east-1.rds.amazonaws.com:5432/initial_intentify_db"
    SECRET_KEY = "dywt=wy@zl+hbqa-suavd=ov=v0tgxyr310b(b3y9k82w*6o2="
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_SECURE = False
    SESSION_COOKIE_SAMESITE = 'None'
    CSRF_COOKIE_SAMESITE = 'None'
    SESSION_COOKIE_HTTPONLY = True
    WTF_CSRF_ENABLED = False
    SESSION_PERMANENT = False
    PERMANENT_SESSION_LIFETIME = timedelta(days=SESSION_LIFETIME)
    SESSION_TYPE = 'sqlalchemy'