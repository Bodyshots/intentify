from app import db
from constants import *
from flask_login import UserMixin

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
  def get_url_list(id: int):
    user = User.get_by_id(id)
    if user:
        return user.url_lst
    return None

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

  @staticmethod
  def get_by_email(email: str):
    return User.query.filter_by(email=email.lower()).first()

class Conversation(db.Model):
  __tablename__ = 'conversations'
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  urls = db.Column(db.ARRAY(db.Text))
  user_role = db.Column(db.Text, default="")
  user_intent = db.Column(db.Text, default="")

  @staticmethod
  def get_by_id(id: int):
    return Conversation.query.get(int(id))

  def json(self):
    return {
      ID: self.id,
      USER_ID: self.user_id,
      URLS: self.urls,
      INTENT: self.user_intent,
      ROLE: self.user_role,
    }