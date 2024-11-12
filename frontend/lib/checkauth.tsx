export const checkAuth = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/auth/status', {
      method: 'GET',
      credentials: 'include',  // Ensure cookies are included in the request
    });
    const data = await response.json();
    return data.isAuth;
  } catch (error) {
    console.error('Error checking authentication status', error);
    return false;
  }
};