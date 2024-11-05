from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import PasswordField, SubmitField, EmailField
from wtforms.validators import InputRequired, Length, ValidationError
from constants import *
from models import User

class RegisterForm(FlaskForm):
  email = EmailField(validators=[InputRequired()], render_kw={"placeholder": "Email"})
  password = PasswordField(validators=[InputRequired(), Length(min=8)],
                            render_kw={"placeholder": "Password"})
  
  def validate_email(self, email):
    existing_email = User.query.filter_by(email=email.data).first()
    if existing_email:
        raise ValidationError("An account has already been registered with this email. Please use a different one.")

class LoginForm(FlaskForm):
  email = EmailField(validators=[InputRequired()], render_kw={"placeholder": "Email"})
  password = PasswordField(validators=[InputRequired(), Length(min=8)],
                           render_kw={"placeholder": "Password"})
  
  submit = SubmitField("Login")