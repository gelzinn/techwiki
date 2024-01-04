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
  /**
   * Redirect user to the homepage when accessing the API base route.
   */

  if (
    equals(request, '/notes') ||
    equals(request, '/api') ||
    equals(request, '/api/emoji')
  )
    return NextResponse.redirect(baseUrl);

  /**
   * Some API routes.
   */

  if (starts(request, '/api/emoji')) {
    const url = request.url;
    const emoji = url.split('/api/emoji/')[1];

    const svg = await fetch(`https://fmj.asrvd.me/${emoji}`);
    const svgText = await svg.text();

    return NextResponse.json({ svg: svgText });
  }

  // await fetch(`https://fmj.asrvd.me/${emoji}`);
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
