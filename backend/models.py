from app import db
from constants import *

# Models
class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(120), unique=True, nullable=False)
  password = db.Column(db.String(80), nullable=False)
  
  def json(self):
    return {ID: self.id, EMAIL: self.email}