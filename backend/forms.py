from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import PasswordField, EmailField, StringField
from wtforms.validators import DataRequired, Length, ValidationError, EqualTo, Email
from constants import *
from models import User

class RegisterForm(FlaskForm):
  email = StringField('Email', validators=[DataRequired(), Email(), Length(max=255)])
  password = PasswordField('Password', validators=[DataRequired(),
                                       Length(min=8, max=80)])
  conf_password = PasswordField('Confirm password', validators=[DataRequired(),
                                                    EqualTo('password')])

  def validate_email(self, email):
    existing_email = User.query.filter_by(email=email.data).first()
    if existing_email:
      raise ValidationError("An account has already been registered with this email. Please use a different one.")

class LoginForm(FlaskForm):
  email = StringField(validators=[DataRequired(), Email()])
  password = PasswordField(validators=[DataRequired()])
  
class ChangeEmailForm(FlaskForm):
  email = StringField('Email', validators=[DataRequired(), Email()])
  new_email = StringField('New email', validators=[DataRequired(), Email(), Length(max=255)])
  
  def validate_new_email(self, new_email):
    # Note: Not checking email field to avoid data exposure
    existing_email = User.query.filter_by(email=new_email.data).first()
    if existing_email:
      raise ValidationError("An account has already been registered with this email. Please use a different one.")

class ChangePasswordForm(FlaskForm):
  password = PasswordField('Password', validators=[DataRequired(),
                                       Length(min=8, max=80)])
  new_password = PasswordField('New password', validators=[DataRequired(),
                                               Length(min=8, max=80)])
  
class ChangeNamesForm(FlaskForm):
  first_name = StringField('First name', validators=[Length(max=255)])
  last_name = StringField('Last name', validators=[Length(max=255)])

class DeleteAccountForm(FlaskForm):
  email = StringField(validators=[DataRequired(), Email()])
  password = PasswordField(validators=[DataRequired()])