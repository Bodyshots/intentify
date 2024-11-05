from flask import Flask, jsonify, request, make_response, Blueprint, url_for, redirect
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from constants import *

from app import db, bcrypt
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
    form = LoginForm()
    if form.validate_on_submit():
      submitted_email = form.email.data
      submitted_password = form.password.data
      
      user = User.query.filter_by(email=submitted_email).first()
      if user and bcrypt.check_password_hash(user.password, submitted_password):
        login_user(user)
        return jsonify({"message": "Login successful!"}, 200)
      return jsonify({"message": "Invalid email or password"}), 401

    return jsonify({"message": "Invalid email or password"}), 401

  except Exception as e:
    return make_response(jsonify({'message': 'Error logging in user', 'error': str(e)}), 500)

@main.route('/api/flask/users', methods=['POST'])
def create_user():
  try:
    data = request.get_json()
    new_user = User(email=data[EMAIL])
    db.session.add(new_user)
    db.session.commit()
  
    return jsonify({
      ID: new_user.id,
      EMAIL: new_user.email
    }), 201
  
  except Exception as e:
    return make_response(jsonify({'message': 'Error creating user', 'error': str(e)}), 500)

@main.route('/register', methods=['POST'])
def register():
  try:
    form = RegisterForm()
    if form.validate_on_submit():
      submitted_email = form.email.data
      submitted_password = form.password.data
      
      user = User.query.filter_by(email=submitted_email).first()
      if user: # Found existing user => User already exists
        return jsonify({"message": "Email already exists"}, 401)

      hash_password = bcrypt.generate_password_hash(submitted_password).decode('utf-8')
      
      # Add the user to the database
      new_user = User(email=submitted_email, password=hash_password)
      db.session.add(new_user)
      db.session.commit()
      
      return jsonify({
        ID: new_user.id,
        EMAIL: new_user.email,
        "message": "User registered successfully!"
      }), 201
    return jsonify({"message": "Invalid email or password"}), 401

  except Exception as e:
    return make_response(jsonify({'message': 'Error logging in user', 'error': str(e)}), 500)

@main.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
  logout_user()
  return redirect(url_for('login'))

@main.route('/health', methods=['GET'])
def health_check():
    return jsonify(status="healthy"), 200
        