// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  // Retrieve the session token from cookies
  const sessionToken = req.cookies.get('session_token') || '';

  // Check if the session token exists
  if (!sessionToken) {
    // If no session token is found, redirect to login page
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // You can make a request to your API or check the session on the server
    const response = await fetch('http://localhost:4000/api/auth/status', {
      method: 'GET',
      credentials: 'include',  // Ensure cookies are included in the request
    });

    const data = await response.json();

    // If not authenticated, redirect to login page
    if (!data.isAuth) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // If authenticated, allow the request to proceed
    return NextResponse.next();

  } catch (error) {
    // If there was an error (e.g., API not reachable), redirect to login
    console.error('Error in authentication middleware:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// This will apply the middleware to specific pages or paths
export const config = {
  matcher: ['/account/:path*', '/logout'],  // Match the routes you want to protect
};
