import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  try {
    // Create a response object that we'll modify
    const res = NextResponse.next();
    
    // Initialize the Supabase client with both request and response
    const supabase = createMiddlewareClient({ req, res });

    // Refresh the session and get the latest session data
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Auth error occurred');
      // On session error, clear any existing cookies and redirect to login
      res.cookies.delete('sb-access-token');
      res.cookies.delete('sb-refresh-token');
      const redirectUrl = new URL('/login', req.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Check if the user is authenticated
    const isAuthenticated = !!session;
    
    // Define auth routes
    const isAuthRoute = 
      req.nextUrl.pathname === '/login' || 
      req.nextUrl.pathname === '/signup' ||
      req.nextUrl.pathname === '/forgot-password' ||
      req.nextUrl.pathname === '/reset-password';
    
    // Skip authentication check for API routes, static files, etc.
    if (req.nextUrl.pathname.startsWith('/api/') || 
        req.nextUrl.pathname.startsWith('/_next/') ||
        req.nextUrl.pathname.includes('.')) {
      return res;
    }

    // If the user is not authenticated and trying to access any non-auth route
    if (!isAuthenticated && !isAuthRoute) {
      const redirectUrl = new URL('/login', req.url);
      return NextResponse.redirect(redirectUrl);
    }

    // If the user is authenticated and trying to access an auth route
    if (isAuthenticated && isAuthRoute) {
      const redirectUrl = new URL('/', req.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Return the response with the updated auth cookie
    return res;
  } catch (error) {
    console.error('Middleware error occurred');
    // On error, redirect to login
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico|public/).*)',
  ],
}; 