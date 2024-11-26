from app import db, bcrypt
from constants import *
from flask_login import UserMixin
from datetime import datetime, timezone

# Models
class User(db.Model, UserMixin):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(255), unique=True, nullable=False)
  password = db.Column(db.String(255), nullable=False)
  # Optional parameters (User can set in settings)
  first_name = db.Column(db.String(255), nullable=True, default="")
  last_name = db.Column(db.String(255), nullable=True, default="")
  conversations = db.relationship('Conversation', 
                                  backref='user',
                                  lazy=True,
                                  cascade='all, delete-orphan')
  
  @staticmethod
  def get_by_id(id: int):
    return User.query.get(int(id))
  
  @staticmethod
  def get_by_email(email: str):
    return User.query.filter_by(email=email.lower()).first()
  
  @staticmethod
  def check_passwords(current_password: str, inputted_password: str) -> bool:
    return bcrypt.check_password_hash(current_password, inputted_password)
  
  @staticmethod
  def hash_password(password: str) -> str:
    return bcrypt.generate_password_hash(password).decode('utf-8')

  def json(self):
    conversations_data = [conversation.json() for conversation in self.conversations]
    return {
      ID: self.id,
      EMAIL: self.email,
      PASSWORD: self.password,
      FIRST_NAME: self.first_name,
      LAST_NAME: self.last_name,
      CONVOS: conversations_data
    }

class Conversation(db.Model):
  __tablename__ = 'conversations'
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(255), db.ForeignKey('users.email'), nullable=False)
  urls = db.Column(db.ARRAY(db.Text))
  user_role = db.Column(db.Text, default="")
  user_intent = db.Column(db.Text, default="")
  created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

  @staticmethod
  def get_by_id(convo_id: int):
    return Conversation.query.get(int(convo_id))

  @staticmethod
  def get_by_email(email: str):
    return Conversation.query.filter_by(email=email)

  def json(self):
    return {
      ID: self.id,
      EMAIL: self.email,
      URLS: self.urls,
      INTENT: self.user_intent,
      ROLE: self.user_role,
      CREATED_AT: self.created_at
    }