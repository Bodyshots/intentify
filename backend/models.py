from app import db
from constants import *
from flask_login import UserMixin
from datetime import datetime, timedelta
from pytz import utc

# Models
class User(db.Model, UserMixin):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(255), unique=True, nullable=False)
  password = db.Column(db.String(80), nullable=False)
  
  def __init__(self, email, password):
      self.email = email
      self.password = password
      
  def get_by_id(passed_id):
      return User.query.filter_by(id=passed_id).first()

  def json(self):
      return {ID: self.id, EMAIL: self.email, PASSWORD: self.password}
    
  def get_by_email(email):
    return User.query.filter_by(email=email).first()
    
class UserSession(db.Model):
  __tablename__ = 'user_session'
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(255), nullable=False)
  session_token = db.Column(db.String(255), unique=True, nullable=False)
  created_at = db.Column(db.DateTime, default=lambda: datetime.now(utc), nullable=False)
  expires_at = db.Column(db.DateTime, default=lambda: datetime.now(utc) + timedelta(days=7), nullable=False)
  
  def __init__(self, email, session_token):
      self.email = email
      self.session_token = session_token
      self.created_at = datetime.now(utc)
      self.expires_at = self.created_at + timedelta(days=7)
      
  def get_session(session_token):
    return UserSession.query.filter_by(session_token=session_token).first()
