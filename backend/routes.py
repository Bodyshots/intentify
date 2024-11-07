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

@main.route('/api/users', methods=['GET'])
def get_users():
  try:
    users = User.query.all()
    users_data = [{ID: user.id, EMAIL: user.email} for user in users]
    return make_response(jsonify(users_data), 200)
  except Exception as e:
    return make_response(jsonify({'message': 'Error getting users', 'error': str(e)}), 500)
  
@main.route('/api/sessions', methods=['GET'])
def get_sessions():
  try:
    users_sessions = UserSession.query.all()
    session_data = [{ID: session.id, 
                     EMAIL: session.email,
                     SESSION_TOKEN: session.session_token,
                     CREATED: session.created_at,
                     EXPIRED: session.expires_at} for session in users_sessions]
    return make_response(jsonify(session_data), 200)
  except Exception as e:
    return make_response(jsonify({'message': 'Error getting user sessions', 'error': str(e)}), 500)

@main.route('/api/users/<id>', methods=['GET'])
def get_user(id):
  try:
    user = User.get_by_id(id)
    if user:
        return make_response(jsonify({'user': user.json()}), 200)
    return make_response(jsonify({'message': 'User not found'}), 404)
  except Exception as e:
    return make_response(jsonify({'message': 'Error getting user', 'error': str(e)}), 500)

@main.route('/api/users/<id>', methods=['PUT'])
def update_user(id):
  try:
    user = User.get_by_id(id)
    if user:
      data = request.get_json()
      user.email = data[EMAIL]
      db.session.commit()
      return make_response(jsonify({'message': 'User updated'}), 200)
    return make_response(jsonify({'message': 'User not found'}), 404)
  except Exception as e:
    return make_response(jsonify({'message': 'Error updating user', 'error': str(e)}), 500)

@main.route('/api/users/<id>', methods=['DELETE'])
def delete_user(id):
  try:
    user = User.get_by_id(id)
    if user:
      db.session.delete(user)
      db.session.commit()
      return make_response(jsonify({'message': 'User deleted'}), 200)
    return make_response(jsonify({'message': 'User not found'}), 404)
  except Exception as e:
    return make_response(jsonify({'message': 'Error deleting user', 'error': str(e)}), 500)
  
@main.route('/login', methods=['POST'])
def login():
  try:
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
        
        response = make_response(jsonify({"message": "Login successful!"}))
        response.set_cookie('session_token', session_token, httponly=True, secure=True, samesite='Strict')
        
        return response, 200
    return make_response(jsonify({"message": "Invalid email or password"}), 401)

  except Exception as e:
    return make_response(jsonify({'message': 'Error logging in user', 'error': str(e)}), 500)

@main.route('/api/user', methods=['POST'])
def create_user():
  try:
    data = request.get_json()
    new_user = User(email=data[EMAIL], password=data[PASSWORD])
    db.session.add(new_user)
    db.session.commit()
  
    return jsonify({
      ID: new_user.id,
      EMAIL: new_user.email,
      PASSWORD: new_user.password
    }), 201
  
  except Exception as e:
    return make_response(jsonify({'message': 'Error creating user', 
                                  'error': str(e),
                                  EMAIL: new_user.email,
                                  PASSWORD: new_user.password,
                                  ID: new_user.id}), 500)

@main.route('/register', methods=['POST'])
def register():
  try:
    data = request.get_json()
    form = RegisterForm(data=data)
    
    if form.validate():
      submitted_email = data[EMAIL]
      submitted_password = data[PASSWORD]
      
      user = User.get_by_email(submitted_email)
      if user: # Found existing user => User already exists
        return jsonify({"message": "Email already exists"}, 401)

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
        "message": "User registered successfully!"
      }), 201)
    return jsonify({"message": "Invalid email or password",
                    "errors:": form.errors}), 401

  except Exception as e:
    db.session.rollback()
    return make_response(jsonify({'message': 'Error registering user', 
                                  'error': str(e)}), 500)

@main.route('/logout', methods=['POST'])
@login_required
def logout():
  try:
    if current_user.is_authenticated:
      response = make_response(jsonify({'message': 'User logged out successfully!'}), 200)
      response.delete_cookie(SESSION_TOKEN)
      
      session_token = request.cookies.get(SESSION_TOKEN, None)
      if session_token:
        curr_session = UserSession.get_session(session_token)
        if curr_session:
            db.session.delete(curr_session)  # Delete the session from the database
            db.session.commit()  # Commit changes to the database
      logout_user()
      return response, 200
    else:
      return make_response(jsonify({'message': 'User needs to be logged in', 
                                    'error': str(e)}), 403)
  except Exception as e:
    return make_response(jsonify({'message': 'Error logging out user', 
                                  'error': str(e)}), 500)

@main.route('/api/health', methods=['GET'])
def health_check():
    return make_response(jsonify(status=HEALTHY), 200)
  
@main.route('/api/auth/status', methods=['GET'])
def auth_check():
  try:
    session_token = request.cookies.get('session_token', None)
    curr_session = UserSession.get_session(session_token)

    # Ensure the expires_at datetime is timezone-aware
    if curr_session:
        # If expires_at is naive, localize it to UTC
        if curr_session.expires_at.tzinfo is None:
            curr_session.expires_at = utc.localize(curr_session.expires_at)

        # Compare the current time with expires_at
        if datetime.now(tz=utc) < curr_session.expires_at:
            return make_response(jsonify({'isAuth': current_user.is_authenticated}), 200)
    
    return make_response(jsonify({'isAuth': False}), 200)

  except Exception as e:
    return make_response(jsonify({'message': 'Error checking authorization', 
                                  'error': str(e)}), 500)
  
@main.route('/api/get-csrf-token', methods=['GET'])
def get_csrf_token():
  try:
    token = generate_csrf()
    response = make_response(jsonify({'csrf_token': token}))
    return response, 200
  except Exception as e:
    return make_response(jsonify({'errors': str(e)}), 500)
