from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from constants import LOGIN_VIEW

db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()

# App instance
def create_app():
  app = Flask(__name__)
  app.config.from_object(Config)
  
  # Initialize login manager
  login_manager.init_app(app)
  login_manager.login_view = LOGIN_VIEW
  
  # Connect frontend w/ backend and vice-versa
  # Frontend port: 3000
  # Backend port: 4000
  # Database port: 5432
  CORS(app)
  db.init_app(app)
  
  @login_manager.user_loader
  def load_user(email):
    from models import User
    return User.query.filter_by(email=email).first()
  
  # Import inside function to avoid circular import
  from routes import main
  app.register_blueprint(main)
  
  # Create all necessary tables
  with app.app_context():
    db.create_all()
    
  return app
