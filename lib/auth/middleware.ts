import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkAuthRoute } from './utils';

export async function authMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  const isAuthRoute = checkAuthRoute(req.nextUrl.pathname);

  // Protect all routes except auth-related ones
  if (!session && !isAuthRoute) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Redirect to dashboard if user is already logged in and tries to access auth pages
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}