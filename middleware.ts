import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protège les routes de l'application : redirige vers /login si la session
// (cookie httpOnly "token") est absente.
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/course/:path*',
    '/lessons/:path*',
    '/practice/:path*',
    '/assessments/:path*',
    '/review/:path*',
    '/progress/:path*',
    '/profile/:path*',
    '/diagnostic/:path*',
    '/final-assessment/:path*',
    '/certificate/:path*',
    '/resources/:path*',
    '/support/:path*',
    '/admin/:path*',
  ],
};
