import { NextRequest, NextResponse } from '@/infra/next/server';

import { redirects as redirectsUrls } from '@/config/redirects';
import { baseUrl } from '@/config/env';

type TRedirects = {
  [key: string]: string;
};

const starts = (request: NextRequest, path: string) =>
  request.nextUrl.pathname.startsWith(path);

const ends = (request: NextRequest, path: string) =>
  request.nextUrl.pathname.endsWith(path);

const equals = (request: NextRequest, path: string) =>
  request.nextUrl.pathname === path;

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
    const res = await fetch(`${baseUrl}/api/notes/random`, {
      mode: 'no-cors',
      cache: 'no-cache',
    });

    const { data } = await res.json();

    if (!data && !data.slug) return NextResponse.redirect(baseUrl, 302);

    return NextResponse.redirect(`${baseUrl}/notes/${data.slug}`);
  }
}

// Configure the middleware to run only on specific paths.

export const config = {
  matcher: null,
};
