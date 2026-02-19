import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userAgent } from 'next/server';

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const isMobileDevice = device.type === 'mobile' || device.type === 'tablet';
  const response = NextResponse.next();
  response.cookies.set('x-is-mobile-device', String(isMobileDevice), {
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
    sameSite: 'lax',
  });
  return response;
}
