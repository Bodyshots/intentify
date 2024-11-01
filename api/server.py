from flask import Flask, jsonify
from flask_cors import CORS

# App instance
app = Flask(__name__)
CORS(app)

@app.route("/api/home", methods=['GET'])
def hello_world():
  return jsonify({
    "msg": "hello world!"
  })

if __name__ == "__main__":
    app.run(debug=True, port=8080)