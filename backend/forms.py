from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField
from wtforms.validators import DataRequired, Length, ValidationError, EqualTo, Email
from models import User

class RegisterForm(FlaskForm):
  email = StringField('Email', validators=[DataRequired(message="This field is required"),
                                           Email(message="Please enter a valid email"),
                                           Length(max=255, message="Please enter an email less than 255 characters")])
  password = PasswordField('Password', validators=[DataRequired(message="This field is required"),
                                       Length(min=8, max=255, message="Please enter a password less than 255 characters")])
  conf_password = PasswordField('Confirm password', validators=[DataRequired(message="This field is required"),
                                                    EqualTo('password')])

  def validate_email(self, email):
    existing_email = User.query.filter_by(email=email.data).first()
    if existing_email:
      raise ValidationError("An account has already been registered with this email. Please use a different one.")

class LoginForm(FlaskForm):
  email = StringField(validators=[DataRequired(message="This field is required"), Email(message="Please enter a valid email")])
  password = PasswordField(validators=[DataRequired(message="This field is required")])
  
class ChangeEmailForm(FlaskForm):
  email = StringField('Email', validators=[DataRequired(message="This field is required"), Email()])
  new_email = StringField('New email', validators=[DataRequired(message="This field is required"), 
                                                   Email(message="Please enter a valid email"), 
                                                   Length(max=255)])
  
  def validate_new_email(self, new_email):
    # Note: Not checking email field to avoid data exposure
    existing_email = User.query.filter_by(email=new_email.data).first()
    if existing_email:
      raise ValidationError("An account has already been registered with this email. Please use a different one.")

class ChangePasswordForm(FlaskForm):
  password = PasswordField('Password', validators=[DataRequired(message="This field is required"),
                                                   Length(min=8, max=255,
                                                          message="Please enter a password less than 255 characters")])
  new_password = PasswordField('New password', validators=[DataRequired(message="This field is required"),
                                                           Length(min=8, max=255, 
                                                                  message="Please enter a password less than 255 characters")])
  
class ChangeNamesForm(FlaskForm):
  first_name = StringField('First name', validators=[Length(max=255, message="Please enter a first name less than 255 characters")])
  last_name = StringField('Last name', validators=[Length(max=255, message="Please enter a last name less than 255 characters")])

class DeleteAccountForm(FlaskForm):
  email = StringField(validators=[DataRequired(message="This field is required"), Email()])
  password = PasswordField(validators=[DataRequired(message="This field is required")])