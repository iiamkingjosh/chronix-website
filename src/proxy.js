import { NextResponse } from 'next/server';

// Paths that require the admin cookie (edit pages + create page)
// /admin/blog itself is excluded — it shows the sign-in UI without a redirect
const PROTECTED_EXACT = ['/blog/create'];
const PROTECTED_SUB_PREFIXES = ['/admin/blog/edit', '/admin/blog/create'];
const ADMIN_COOKIE = 'admin_signed_in';
const SIGN_IN_REDIRECT = '/admin/blog';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Allow the sign-in page through unconditionally to prevent redirect loops
  if (pathname === SIGN_IN_REDIRECT) {
    return NextResponse.next();
  }

  const isProtected =
    PROTECTED_EXACT.includes(pathname) ||
    PROTECTED_SUB_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (!isProtected) {
    return NextResponse.next();
  }

  const isSignedIn = request.cookies.get(ADMIN_COOKIE)?.value === '1';
  if (isSignedIn) {
    return NextResponse.next();
  }

  // Redirect unauthenticated requests to the sign-in page, preserving destination
  const url = request.nextUrl.clone();
  url.pathname = SIGN_IN_REDIRECT;
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin/blog/edit/:path*', '/admin/blog/create', '/blog/create'],
};
