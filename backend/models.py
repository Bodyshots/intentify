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
  url_lst = db.relationship(
            'UserURLList',
            backref='user',
            uselist=False,
            lazy=True,
            cascade='all, delete-orphan'
            )
  
  def __init__(self, email, password):
    self.email = email
    self.password = password
  
  @staticmethod
  def get_by_id(id):
    return User.query.get(int(id))

  def json(self):
    return {ID: self.id, 
            EMAIL: self.email, 
            PASSWORD: self.password,
            FIRST_NAME: self.first_name,
            LAST_NAME: self.last_name}

  @staticmethod
  def get_by_email(email):
    return User.query.filter_by(email=email).first()

class UserURLList(db.Model):
  __tablename__ = 'url_list'
  id = db.Column(db.Integer, primary_key=True)
  user_email = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  urls = db.relationship(
      'UserURL',
      backref='url_list',
      uselist=True,
      lazy=True,
      cascade='all, delete-orphan'
  )
  user_role = db.Column(db.Text, nullable=True)

  @staticmethod
  def get_by_id(id):
    return UserURLList.query.get(int(id))

  def json(self):
    return {
      ID: self.id,
      EMAIL: self.user_email,
      ROLE: self.user_role}

class UserURL(db.Model):
  __tablename__ = 'urls'
  id = db.Column(db.Integer, primary_key=True)
  list_id = db.Column(db.Integer, db.ForeignKey('url_list.id'), nullable=False)

  url = db.Column(db.Text, nullable=False)
  desc = db.Column(db.Text, nullable=False)

  @staticmethod
  def get_by_id(id):
    return UserURL.query.get(int(id))

  def json(self):
    return {
      ID: self.id,
      LIST_ID: self.list_id,
      URL: self.url,
      DESC: self.desc}
