# Constants
ID = 'id'
EMAIL = 'email'
LOGIN_VIEW = 'login'
PASSWORD = 'password'
ACTIVE = 'active'
HEALTHY = 'healthy'
SESSION_TOKEN = 'session_token'
CREATED_AT = 'created_at'
EXPIRED_AT = 'expires_at'
FIRST_NAME = 'first_name'
LAST_NAME = 'last_name'
AUTH = 'isAuth'
MSG = 'message'
ERROR = "error"
CSRF_TOKEN = 'csrf_token'

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