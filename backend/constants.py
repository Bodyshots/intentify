# Constants
ID = 'id'
LOGIN_VIEW = 'login'
EMAIL = 'email'
NEW_EMAIL = 'new_email'
PASSWORD = 'password'
NEW_PASSWORD = 'new_password'
ACTIVE = 'active'
HEALTHY = 'healthy'
SESSION_TOKEN = 'session'
CREATED_AT = 'created_at'
EXPIRED_AT = 'expires_at'
FIRST_NAME = 'first_name'
LAST_NAME = 'last_name'
AUTH = 'isAuth'
MSG = 'message'
ERROR = "error"
CSRF_TOKEN = 'csrf_token'
SESSION_LIFETIME = 7
SECRET_KEY_INT = 42

# Methods
GET = 'GET'
POST = 'POST'
PUT = 'PUT'
PATCH = 'PATCH'
DELETE = 'DELETE'

## HTTP Response Codes
### 200 codes
OK = 200
CREATED = 201
ACCEPTED = 202

### 400 codes
BAD_REQUEST = 400
UNAUTHORIZED = 401 # (ie. Unauthenticated)
FORBIDDEN = 403    # Access rights insufficient
NOT_FOUND = 404

### 500 codes
INTERNAL_ERR = 500