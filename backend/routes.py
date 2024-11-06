from flask import Flask, jsonify, request, make_response, Blueprint, redirect, current_app, session
from flask_login import login_user, LoginManager, login_required, logout_user, current_user
from constants import *

from app import db, bcrypt
from flask_wtf.csrf import generate_csrf
from forms import LoginForm, RegisterForm
from models import User

main = Blueprint('main', __name__)

@main.route("/api/home", methods=['GET'])
def hello_world():
  return jsonify({
    "msg": "hello world!"
  })

@main.route('/api/flask/users', methods=['GET'])
def get_users():
  try:
    users = User.query.all()
    users_data = [{ID: user.id, EMAIL: user.email} for user in users]
    return jsonify(users_data), 200
  except Exception as e:
    return make_response(jsonify({'message': 'Error getting users', 'error': str(e)}), 500)

@main.route('/api/flask/users/<id>', methods=['GET'])
def get_user(id):
  try:
    user = User.query.filter_by(ID=id).first()
    if user:
        return make_response(jsonify({'user': user.json()}), 200)
    return make_response(jsonify({'message': 'User not found'}), 404)
  except Exception as e:
    return make_response(jsonify({'message': 'Error getting user', 'error': str(e)}), 500)

@main.route('/api/flask/users/<id>', methods=['PUT'])
def update_user(id):
  try:
    user = User.query.filter_by(ID=id).first()
    if user:
      data = request.get_json()
      user.email = data[EMAIL]
      db.session.commit()
      return make_response(jsonify({'message': 'User updated'}), 200)
    return make_response(jsonify({'message': 'User not found'}), 404)
  except Exception as e:
    return make_response(jsonify({'message': 'Error updating user', 'error': str(e)}), 500)

@main.route('/api/flask/users/<id>', methods=['DELETE'])
def delete_user(id):
  try:
    user = User.query.filter_by(id=id).first()
    if user:
      db.session.delete(user)
      db.session.commit()
      return make_response(jsonify({'message': 'User deleted'}), 200)
    return make_response(jsonify({'message': 'User not found'}), 404)
  except Exception as e:
    return make_response(jsonify({'message': 'Error deleting user', 'error': str(e)}), 500)
  
@main.route('/login', methods=['GET', 'POST'])
def login():
  try:
    if request.method == 'POST':
      data = request.get_json()
      form = LoginForm(data=data)
      if form.validate():
        submitted_email = data[EMAIL]
        submitted_password = data[PASSWORD]
        
        user = User.query.filter_by(email=submitted_email).first()
        if user and bcrypt.check_password_hash(user.password, submitted_password):
          login_user(user)
          
          return jsonify({"message": "Login successful!"}, 200)
        return jsonify({"message": "Invalid email or password"}), 401
    return redirect('/login')

  except Exception as e:
    return make_response(jsonify({'message': 'Error logging in user', 'error': str(e)}), 500)

@main.route('/api/flask/user', methods=['POST'])
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

@main.route('/register', methods=['GET', 'POST'])
def register():
  try:
    if request.method == 'POST':
      data = request.get_json()
      form = RegisterForm(data=data)
      
      if form.validate():
        submitted_email = data[EMAIL]
        submitted_password = data[PASSWORD]
        
        user = User.query.filter_by(email=submitted_email).first()
        if user: # Found existing user => User already exists
          return jsonify({"message": "Email already exists"}, 401)

        hash_password = bcrypt.generate_password_hash(submitted_password).decode('utf-8')
        
        # Add the user to the database
        new_user = User(email=submitted_email,
                        password=hash_password)
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
          ID: new_user.id,
          EMAIL: new_user.email,
          PASSWORD: new_user.password,
          "message": "User registered successfully!"
        }), 201
      return jsonify({"message": "Invalid email or password",
                      "errors:": form.errors}), 401
    return redirect('/register')

  except Exception as e:
    return make_response(jsonify({'message': 'Error registering user', 
                                  'error': str(e)}), 500)

@main.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
  try:
    if current_user.is_authenticated:
      logout_user()
      return redirect('/login')
    else:
      return redirect('/login')
  except Exception as e:
    return make_response(jsonify({'message': 'Error logging out user', 
                                  'error': str(e)}), 500)

@main.route('/api/health', methods=['GET'])
def health_check():
    return jsonify(status="healthy"), 200
  
@main.route('/api/auth/status', methods=['GET'])
def auth_check():
  try:
    return jsonify({'isAuth': current_user.is_authenticated})
  except Exception as e:
    return make_response(jsonify({'message': 'Error checking authorization', 
                          'error': str(e)}), 500)
  
@main.route('/api/get-csrf-token', methods=['GET'])
def get_csrf_token():
  try:
    token = generate_csrf()
    return jsonify({'csrf_token': token})
  except Exception as e:
    return jsonify({'errors': str(e)}, 500)
