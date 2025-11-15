import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl

  // Protected pages
  const protectedRoutes = ['/dashboard', '/profile']

  // Superadmin-only pages
  const adminRoutes = ['/admin', '/admin/users']

  // If route is protected → user must be logged in
  if (protectedRoutes.some((r) => pathname.startsWith(r))) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url))

    try {
      jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // If route is admin-only
  if (adminRoutes.some((r) => pathname.startsWith(r))) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url))

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

      if (decoded.role !== 'superadmin') {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/(protected)(.*)', '/admin/:path*']
}
