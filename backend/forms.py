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
