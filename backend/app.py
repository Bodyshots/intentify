from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect
from config import Config
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_session import Session
from constants import LOGIN_VIEW

db = SQLAlchemy()
cors = CORS()
bcrypt = Bcrypt()
login_manager = LoginManager()
csrf = CSRFProtect()

# App instance
def create_app():
  app = Flask(__name__)
  app.config.from_object(Config)
  
  # Initialize login manager
  login_manager.init_app(app)
  login_manager.login_view = LOGIN_VIEW
  
  from models import User
  @login_manager.user_loader
  def load_user(user_id):
      return User.get(user_id)
  
  # Connect frontend w/ backend and vice-versa
  # Frontend port: 3000
  # Backend port: 4000
  # Database port: 5432
  cors.init_app(app, supports_credentials=True)
  db.init_app(app)
  csrf.init_app(app)
  app.config['SESSION_SQLALCHEMY'] = db
  
  Session(app)
  
  # Import inside function to avoid circular import
  from routes import main
  app.register_blueprint(main)
  
  # Create all necessary tables
  with app.app_context():
    db.create_all()
    
  return app
