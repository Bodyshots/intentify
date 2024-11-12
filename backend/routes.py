from flask import jsonify, request, make_response, Blueprint
from flask_login import login_user, login_required, logout_user, current_user
from constants import *

from app import db, bcrypt
from flask_wtf.csrf import generate_csrf
from forms import LoginForm, RegisterForm
from models import User, UserSession
import secrets
from datetime import datetime
from pytz import utc

main = Blueprint('main', __name__)

# Helper to check authorization
def check_auth_status():
  session_token = request.cookies.get(SESSION_TOKEN, None)
  if session_token:
      curr_session = UserSession.get_session(session_token)
      if curr_session and curr_session.expires_at:
          # Ensure expires_at is timezone-aware
          if curr_session.expires_at.tzinfo is None:
              curr_session.expires_at = utc.localize(curr_session.expires_at)
          if datetime.now(tz=utc) < curr_session.expires_at:
              return True and current_user.is_authenticated
  return False

@main.route('/api/users', methods=[GET])
def get_users():
  try:
    users = User.query.all()
    users_data = [{ID: user.id,
                   EMAIL: user.email,
                   FIRST_NAME: user.first_name,
                   LAST_NAME: user.last_name,
                   PASSWORD: user.password} for user in users]
    return make_response(jsonify(users_data), OK)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error getting users',
                                  ERROR: str(e)}), INTERNAL_ERR)
  
@main.route('/api/sessions', methods=[GET])
def get_sessions():
  try:
    users_sessions = UserSession.query.all()
    session_data = [{ID: session.id, 
                     EMAIL: session.email,
                     SESSION_TOKEN: session.session_token,
                     CREATED: session.created_at,
                     EXPIRED: session.expires_at} for session in users_sessions]
    return make_response(jsonify(session_data), OK)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error getting user sessions',
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

@main.route('/api/users/<id>', methods=[GET])
def get_user(id):
  try:
    user = User.get_by_id(id)
    if user:
        return make_response(jsonify({'user': user.json()}), OK)
    return make_response(jsonify({MSG: 'User not found'}), NOT_FOUND)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error getting user',
                                  ERROR: str(e)}), INTERNAL_ERR)
  
@main.route('/api/users/update/email', methods=[PUT])
def update_email():
  try:
    old_email = current_user.email
    
    # Update user first
    data = request.get_json()
    current_user.email = data[EMAIL]
    
    # Update session info
    UserSession.query.filter_by(email=old_email).update({EMAIL: data[EMAIL]})

    db.session.commit()
    return make_response(jsonify({MSG: 'User email updated'}), OK)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error updating user email',
                                  ERROR: str(e)}), INTERNAL_ERR)
  
@main.route('/api/users/update/password', methods=[PUT])
def update_password():
  try:
    data = request.get_json()
    current_user.password = bcrypt.generate_password_hash(data[PASSWORD]).decode('utf-8')
    db.session.commit()
    return make_response(jsonify({MSG: 'User password updated'}), OK)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error updating user password',
                                  ERROR: str(e)}), INTERNAL_ERR)
  
@main.route('/api/users/update/name', methods=[PUT])
def update_names():
  try:
    data = request.get_json()
    current_user.first_name, current_user.last_name = data[FIRST_NAME], data[LAST_NAME]
    db.session.commit()
    return make_response(jsonify({MSG: 'User first and last name updated'}), OK)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error updating user first and last names',
                                  ERROR: str(e)}), INTERNAL_ERR)

@main.route('/api/user/delete', methods=[DELETE])
def delete_curr_user():
  try:
    data = request.get_json()
    for session in UserSession.query.filter_by(email=data[EMAIL]):
      db.session.delete(session)  # Delete the session from the database
    
    db.session.delete(current_user)
    db.session.commit()
    return make_response(jsonify({MSG: 'User deleted'}), OK)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error deleting user',
                                  ERROR: str(e)}), INTERNAL_ERR)

@main.route('/api/users/<id>', methods=[DELETE])
def delete_user(id):
  try:
    user = User.get_by_id(id)
    if user:
      db.session.delete(user)
      db.session.commit()
      return make_response(jsonify({MSG: 'User deleted'}), OK)
    return make_response(jsonify({MSG: 'User not found'}), NOT_FOUND)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error deleting user',
                                  ERROR: str(e)}), INTERNAL_ERR)
  
@main.route('/login', methods=[POST])
def login():
  try:
    if (check_auth_status()):
      return make_response(jsonify({MSG: "User already logged in"}), FORBIDDEN)

    data = request.get_json()
    form = LoginForm(data=data)
    if form.validate():
      submitted_email = data[EMAIL]
      submitted_password = data[PASSWORD]
      
      user = User.get_by_email(submitted_email)
      if user and bcrypt.check_password_hash(user.password, submitted_password):
        login_user(user)

        session_token = secrets.token_hex(42)
        user_session = UserSession(email=submitted_email, session_token=session_token)
        
        db.session.add(user_session)
        db.session.commit()
        
        response = make_response(jsonify({MSG: "Login successful!"}))
        response.set_cookie(SESSION_TOKEN,
                            session_token,
                            httponly=True,
                            secure=True,
                            samesite='Strict')
        
        return response, OK
      return make_response(jsonify({MSG: "Invalid email or password"}), UNAUTHORIZED)

  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error logging in user',
                                  ERROR: str(e)}), INTERNAL_ERR)

@main.route('/api/user', methods=[POST])
def create_user():
  try:
    data = request.get_json()
    new_user = User(email=data[EMAIL], password=data[PASSWORD])
    db.session.add(new_user)
    db.session.commit()
  
    return make_response(jsonify({
      ID: new_user.id,
      EMAIL: new_user.email,
      PASSWORD: new_user.password
    }), CREATED)
  
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error creating user', 
                                  ERROR: str(e),
                                  EMAIL: new_user.email,
                                  PASSWORD: new_user.password,
                                  ID: new_user.id}), INTERNAL_ERR)

@main.route('/register', methods=[POST])
def register():
  try:
    if (check_auth_status()):
      return make_response(jsonify({MSG: "User already logged in"}), FORBIDDEN)

    data = request.get_json()
    form = RegisterForm(data=data)
    
    if form.validate():
      submitted_email = data[EMAIL]
      submitted_password = data[PASSWORD]
      
      user = User.get_by_email(submitted_email)
      if user: # Found existing user => User already exists
        return make_response(jsonify({MSG: "Email already exists"}), UNAUTHORIZED)

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
        MSG: "User registered successfully!"
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
    if current_user.is_authenticated:
      response = make_response(jsonify({MSG: 'User logged out successfully!'}), OK)
      response.delete_cookie(SESSION_TOKEN)
      
      session_token = request.cookies.get(SESSION_TOKEN, None)
      for session in UserSession.query.filter_by(session_token=session_token):
        db.session.delete(session) # Delete the session from the database
      logout_user()
      db.session.commit()  # Commit changes to the database
      return response, OK
    else:
      return make_response(jsonify({MSG: 'User needs to be logged in', 
                                    ERROR: str(e)}), UNAUTHORIZED)
  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({MSG: 'Error logging out user', 
                                  ERROR: str(e)}), INTERNAL_ERR)

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
