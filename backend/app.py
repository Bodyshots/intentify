from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_session import Session
from constants import LOGIN_VIEW
from dotenv import load_dotenv
from config import Config

db = SQLAlchemy()
cors = CORS()
bcrypt = Bcrypt()
login_manager = LoginManager()
csrf = CSRFProtect()

# App instance
def create_app():
  load_dotenv() # Load environment vars
  app = Flask(__name__)
  app.config.from_object(Config)
  
  # Initialize login manager
  login_manager.init_app(app)
  login_manager.login_view = LOGIN_VIEW
  
  from models import User
  @login_manager.user_loader
  def load_user(user_id):
      return User.get_by_id(user_id)
  
  # Connect frontend w/ backend and vice-versa
  # Frontend port: 3000
  # Backend port: 4000
  # Database port: 5432
  cors.init_app(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
  db.init_app(app)
  csrf.init_app(app)
  app.config['SESSION_SQLALCHEMY'] = db
  
  # Server-side sessions
  Session(app)
  
  # Import inside function to avoid circular import
  from routes import main
  app.register_blueprint(main)
  
  # Create all necessary tables
  with app.app_context():
    db.create_all()
    
  return app