from app import db
from constants import *
from flask_login import UserMixin

# Models
class User(db.Model, UserMixin):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(255), unique=True, nullable=False)
  password = db.Column(db.String(80), nullable=False)
  # Optional parameters (User can set in settings)
  first_name = db.Column(db.String(255), nullable=True)
  last_name = db.Column(db.String(255), nullable=True)
  
  def __init__(self, email, password):
    self.email = email
    self.password = password
      
  def get_by_id(passed_id):
    return User.query.filter_by(id=passed_id).first()

  def json(self):
    return {ID: self.id, 
            EMAIL: self.email, 
            PASSWORD: self.password,
            FIRST_NAME: self.first_name,
            LAST_NAME: self.last_name}
    
  def get_by_email(email):
    return User.query.filter_by(email=email).first()
