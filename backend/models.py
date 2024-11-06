from app import db
from constants import *
from flask_login import UserMixin

# Models
class User(db.Model, UserMixin):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(255), unique=True, nullable=False)
  password = db.Column(db.String(80), nullable=False)
  
  def __init__(self, email, password):
    self.email = email
    self.password = password
    
  def get(passed_id):
    return User.query.filter_by(id=passed_id).first()

  def json(self):
    return {ID: self.id, EMAIL: self.email, PASSWORD: self.password}