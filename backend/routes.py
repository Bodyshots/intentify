from flask import jsonify, request, make_response, Blueprint, session
from flask_login import login_user, login_required, logout_user, current_user
from constants import *

from app import db, bcrypt
from flask_wtf.csrf import generate_csrf
from forms import LoginForm, RegisterForm, ChangeEmailForm, ChangePasswordForm, ChangeNamesForm, DeleteAccountForm
from models import User, Conversation
from datetime import datetime
from pytz import utc
from datetime import timedelta
import requests

main = Blueprint('main', __name__)

# Helper to check authorization
def check_auth_status():
  if (session.get(EMAIL, None)):
    expiry = session.get(EXPIRED_AT, None)
    # Ensure expires_at is timezone-aware
    if expiry and expiry.tzinfo is None:
        expiry = utc.localize(expiry)
    if datetime.now(tz=utc) < expiry:
        return True and current_user.is_authenticated
  return False


###### Users ######
@main.route('/api/users', methods=[GET])
def get_users():
  try:
    users = User.query.all()
    users_data = [{USER: user.json()} for user in users]
    return make_response(jsonify(users_data), OK)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error getting users',
                                  ERROR: str(e)}), INTERNAL_ERR)

@main.route('/api/user', methods=[GET])
def get_curr_user():
  try:
    if (check_auth_status()):
      return make_response(jsonify({ID: current_user.id,
                                    EMAIL: current_user.email,
                                    FIRST_NAME: current_user.first_name,
                                    LAST_NAME: current_user.last_name,
                                    PASSWORD: current_user.password}), OK)
    return make_response(jsonify({MSG: "User not signed in"}), UNAUTHORIZED)
  except Exception as e:
    return make_response(jsonify({MSG: "Error getting user information",
                                  ERROR: str(e)}), BAD_REQUEST)

@main.route('/api/users/<int:id>', methods=[GET])
def get_user(id: int):
  try:
    user = User.get_by_id(id)
    if user:
        return make_response(jsonify({USER: user.json()}), OK)
    return make_response(jsonify({MSG: 'User not found'}), NOT_FOUND)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error getting user',
                                  ERROR: str(e)}), INTERNAL_ERR)
  
@main.route('/api/users/update/email', methods=[PUT])
def update_email():
  try:
    data = request.get_json()
    form = ChangeEmailForm(data=data)
  
    if (form.validate() and current_user and (data.get(EMAIL) == current_user.email)):
      current_user.email = data.get(NEW_EMAIL)
      session[EMAIL] = data.get(NEW_EMAIL)
      db.session.commit()
      return make_response(jsonify({MSG: 'Email updated!'}), OK)
    return make_response(jsonify({MSG: 'Current email does not match or email already exists'}), BAD_REQUEST)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error updating user email',
                                  ERROR: str(e)}), INTERNAL_ERR)
  
@main.route('/api/users/update/password', methods=[PUT])
def update_password():
  try:
    data = request.get_json()
    form = ChangePasswordForm(data=data)

    if (form.validate() and current_user and (bcrypt.check_password_hash(current_user.password, 
                                                                         data.get(PASSWORD)))):
      current_user.password = bcrypt.generate_password_hash(data.get(NEW_PASSWORD).decode('utf-8'))
      db.session.commit()
      return make_response(jsonify({MSG: 'Password updated!'}), OK)
    return make_response(jsonify({MSG: 'Current password does not match'}), BAD_REQUEST)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error updating user password',
                                  ERROR: str(e)}), INTERNAL_ERR)
  
@main.route('/api/users/update/names', methods=[PUT])
def update_names():
  try:
    data = request.get_json()
    form = ChangeNamesForm(data=data)
    
    if (form.validate()):
      current_user.first_name, current_user.last_name = (data.get(FIRST_NAME, ""),
                                                         data.get(LAST_NAME, ""))
      db.session.commit()
      return make_response(jsonify({MSG: 'First and last name updated!'}), OK)
    return make_response(jsonify({MSG: 'Invalid first or last name'}), BAD_REQUEST)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error updating user first and last names',
                                  ERROR: str(e)}), INTERNAL_ERR)

@main.route('/api/user/delete', methods=[DELETE])
def delete_curr_user():
  try:
    data = request.get_json()
    form = DeleteAccountForm(data=data)
    
    if (form.validate() and current_user and (current_user.email == data.get(EMAIL)
                                              and 
                                              (bcrypt.check_password_hash(current_user.password,
                                                                          data.get(PASSWORD))))):
      db.session.delete(current_user)
      db.session.commit()
      return make_response(jsonify({MSG: 'Account deleted!'}), OK)
    return make_response(jsonify({MSG: 'Invalid email or password'}), BAD_REQUEST)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error deleting user',
                                  ERROR: str(e)}), INTERNAL_ERR)
  
@main.route('/login', methods=[POST])
def login():
  try:
    if (check_auth_status()):
      return make_response(jsonify({MSG: "You are already logged in"}), FORBIDDEN)

    data = request.get_json()
    form = LoginForm(data=data)
    if form.validate():
      submitted_email = data.get(EMAIL)
      submitted_password = data.get(PASSWORD)
      
      user = User.get_by_email(submitted_email)
      if user and bcrypt.check_password_hash(user.password, submitted_password):
        login_user(user, remember=True)
        session[EMAIL] = submitted_email
        session[CREATED_AT] = datetime.now(utc)
        session[EXPIRED_AT] = datetime.now(utc) + timedelta(SESSION_LIFETIME)
        
        response = make_response(jsonify({MSG: "Login successful!",
                                          USER: user.json()}))
        
        return response, OK
      return make_response(jsonify({MSG: "Invalid email or password"}), UNAUTHORIZED)

  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error logging in user',
                                  ERROR: str(e)}), INTERNAL_ERR)

@main.route('/register', methods=[POST])
def register():
  try:
    if (check_auth_status()):
      return make_response(jsonify({MSG: "You are already logged in"}), FORBIDDEN)

    data = request.get_json()
    form = RegisterForm(data=data)
    
    if form.validate():
      submitted_email = data.get(EMAIL)
      submitted_password = data.get(PASSWORD)
      
      user = User.get_by_email(submitted_email)
      if user: # Found existing user => User already exists
        return make_response(jsonify({MSG: "Account with this email already exists"}), UNAUTHORIZED)

      hash_password = bcrypt.generate_password_hash(submitted_password).decode('utf-8')
      
      # Add the user to the database
      new_user = User(email=submitted_email,
                      password=hash_password)
      
      db.session.add(new_user)
      db.session.commit()
      
      return make_response(jsonify({
        ID: new_user.id,
        EMAIL: new_user.email,
        PASSWORD: new_user.password,
        MSG: "Registration successful!"
      }), CREATED)
    return make_response(jsonify({MSG: "Invalid email or password",
                                  ERROR: form.errors}), UNAUTHORIZED)

  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error registering user', 
                                  ERROR: str(e)}), INTERNAL_ERR)

@main.route('/logout', methods=[POST])
@login_required
def logout():
  try:
    if current_user and current_user.is_authenticated:
      response = make_response(jsonify({MSG: 'Logged out successfully!'}), OK)

      logout_user()
      db.session.commit()  # Commit changes to the database
      return response
    return make_response(jsonify({MSG: 'You need to be logged in', 
                                  ERROR: str(e)}), UNAUTHORIZED)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error logging out user', 
                                  ERROR: str(e)}), INTERNAL_ERR)

@main.route('/api/send/id', methods=[GET])
def get_id():
  try:
    if current_user and current_user.is_authenticated:
      return make_response(jsonify({MSG: 'User id sent', USER_ID: current_user.id}), OK)
    return make_response(jsonify({MSG: 'User not signed in'}), UNAUTHORIZED)
  except Exception as e:
    return make_response(jsonify({MSG: 'Error in getting user id', 
                                  ERROR: str(e)}), INTERNAL_ERR)

###### Conversations ######
@main.route('/api/conversation/create', methods=[POST])
def create_conversation():
  try:
    data = request.get_json()

    if current_user and current_user.is_authenticated:
      # Create a new conversation for the authenticated user
      new_convo = Conversation(user_id=data.get(USER_ID),
                               urls=data.get(URLS),
                               user_role=data.get(ROLE),
                               user_intent=data.get(INTENT))

      # Add the new conversation to the session and commit
      db.session.add(new_convo)
      db.session.commit()

      return make_response(jsonify({
        ID: new_convo.id,
        USER_ID: new_convo.user_id,
        URLS: new_convo.urls,
        ROLE: new_convo.user_role,
        INTENT: new_convo.user_intent,
        MSG: "Conversation created successfully!"
      }), CREATED)

    return make_response(jsonify({MSG: "User not signed in"}), UNAUTHORIZED)

  except Exception as e:
    db.session.rollback()  # Rollback in case of error
    return make_response(jsonify({
        MSG: "Error creating conversation",
        ERROR: str(e)
    }), INTERNAL_ERR)

@login_required
@main.route('/api/conversation/delete/<int:id>', methods=[DELETE])
def delete_conversation(id: int):
  try:
    convo = Conversation.get_by_id(id)
    if (current_user and convo) and (current_user.is_authenticated and
        current_user.id == convo.user_id):
      db.session.delete(convo)
      db.session.commit()
      return make_response(jsonify({MSG: 'Conversation deleted!'}), OK)

    return make_response(jsonify({MSG: "User not signed in or conversation does not exist"}),
                                  UNAUTHORIZED)

  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({
        MSG: "Error deleting conversation",
        ERROR: str(e)
    }), INTERNAL_ERR)
    
@main.route('/api/conversations', methods=[GET])
def get_conversations():
  try:
    convos = Conversation.query.all()
    convos_data = [{CONVO: convo.json()} for convo in convos]
    return make_response(jsonify(convos_data), OK)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error getting users',
                                  ERROR: str(e)}), INTERNAL_ERR)

###### Other functions ######

@main.route('/api/health', methods=[GET])
def health_check():
  return make_response(jsonify(status=HEALTHY), OK)
  
@main.route('/api/auth/status', methods=[GET])
def auth_check():
  try:
    return make_response(jsonify({AUTH: check_auth_status()}), OK)

  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error checking authorization', 
                                  ERROR: str(e)}), INTERNAL_ERR)
  
@main.route('/api/get-csrf-token', methods=[GET])
def get_csrf_token():
  try:
    token = generate_csrf()
    response = make_response(jsonify({CSRF_TOKEN: token}))
    return response, OK
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({ERROR: str(e)}), INTERNAL_ERR)
