from os import environ
from os import urandom

class Config:
    SQLALCHEMY_DATABASE_URI = environ.get('DATABASE_URL')
    SECRET_KEY = urandom(42).hex()