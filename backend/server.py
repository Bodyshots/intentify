from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

# Constants
ID = 'id'
EMAIL = 'email'


# App instance
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')
db = SQLAlchemy(app)

class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(120), unique=True, nullable=False)
  
  def json(self):
    return {ID: self.id, EMAIL: self.email}
  
db.create_all()

@app.route("/api/home", methods=['GET'])
def hello_world():
  return jsonify({
    "msg": "hello world!"
  })
  
@app.route('/api/flask/users', methods=['POST'])
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

@app.route('/api/flask/users', methods=['GET'])
def get_users():
  try:
    users = User.query.all()
    users_data = [{ID: user.id, EMAIL: user.email} for user in users]
    return jsonify(users_data), 200
  except Exception as e:
    return make_response(jsonify({'message': 'Error getting users', 'error': str(e)}), 500)

@app.route('/api/flask/users/<id>', methods=['GET'])
def get_user(id):
  try:
    user = User.query.filter_by(ID=id).first()
    if user:
        return make_response(jsonify({'user': user.json()}), 200)
    return make_response(jsonify({'message': 'User not found'}), 404)
  except Exception as e:
    return make_response(jsonify({'message': 'Error getting user', 'error': str(e)}), 500)

@app.route('/api/flask/users/<id>', methods=['PUT'])
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

@app.route('/api/flask/users/<id>', methods=['DELETE'])
def delete_user(id):
  try:
    user = User.query.filter_by(ID=id).first()
    if user:
      db.session.delete(user)
      db.session.commit()
      return make_response(jsonify({'message': 'User deleted'}), 200)
    return make_response(jsonify({'message': 'User not found'}), 404)
  except Exception as e:
    return make_response(jsonify({'message': 'Error deleting user', 'error': str(e)}), 500)

if __name__ == "__main__":
    app.run(debug=True, port=8080)