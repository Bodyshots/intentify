export const ErrorConstants = Object.freeze({
  CSRF: 'CSRF token is missing',
  EMAIL_VALID: 'Please enter a valid email!',
  EMAIL_UPDATE: 'Error updating email',
  EMAIL_LONG: 'Email must be less than 255 characters',
  PASS_SHORT: 'Password must be at least 8 characters',
  PASS_LONG: 'Password must be less than 255 characters',
  PASS_UPDATE: 'Error updating password',
  PASS_MISMATCH: 'Passwords do not match',
  NAME_UPDATE: 'Error updating first or last name',
  NAME_LONG: 'Your name must be less than 255 characters',
  ACC_DELETE: 'Error deleting account',
  AUTH_PROTECTED: 'You must be signed in to access this page!',
  LOGIN: 'Error logging in',
  REGISTER: 'Error registering',
  LOGOUT: 'Error during logout process',
  AUTH_GUEST: 'You cannot access this page when you are signed in!',
  CONVO_GET: 'Error getting conversations'
})