import { NextRequest, NextResponse } from '@/infra/next/server';

const starts = (request: NextRequest, path: string) =>
  request.nextUrl.pathname.startsWith(path);

export async function middleware(request: NextRequest) {
  if (starts(request, '/api') || starts(request, '/notes'))
    return NextResponse.redirect('http://localhost:3000/');
}

export const config = {
  matcher: ['/api', '/notes'],
};
