import { NextRequest, NextResponse } from '@/infra/next/server';

import { redirects as redirectsUrls } from '@/config/redirects';
import { baseUrl } from '@/config/env';

const starts = (request: NextRequest, path: string) =>
  request.nextUrl.pathname.startsWith(path);

const ends = (request: NextRequest, path: string) =>
  request.nextUrl.pathname.endsWith(path);

const equals = (request: NextRequest, path: string) =>
  request.nextUrl.pathname === path;

type TRedirects = {
  [key: string]: string;
};

const redirects: TRedirects = redirectsUrls;

/**
 * This middleware function allows us to run code before a request is handled by the application.
 */

export async function middleware(request: NextRequest) {
  if (equals(request, '/api') || equals(request, '/notes'))
    return NextResponse.redirect(baseUrl);

  /**
   * Shortcuts for the most common redirects.
   */

  for (const redirect in redirects) {
    if (equals(request, redirect))
      return NextResponse.redirect(redirects[redirect]);
  }

  /**
   * Redirect user to a random note.
   */

  if (equals(request, '/explore/random')) {
    const res = await fetch(`${baseUrl}/api/notes/random`);
    const { data } = await res.json();

    if (!data || !data.slug) {
      console.error('Error on getting random note.');
      return NextResponse.next();
    }

    return NextResponse.redirect(`${baseUrl}/notes/${data.slug}`);
  }
}

// Configure the middleware to run only on specific paths.

export const config = {
  matcher: null,
};
