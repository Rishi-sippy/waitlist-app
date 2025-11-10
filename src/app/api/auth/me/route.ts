// src/app/api/auth/me/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    // Using NextRequest style: req.headers.get('cookie') or new URL(req.url)
    // But NextResponse.cookies() not available here, so parse cookie manually
    const cookieHeader = req.headers.get('cookie') ?? ''
    const match = cookieHeader
      .split(';')
      .map((s) => s.trim())
      .find((s) => s.startsWith('token='))
    const token = match ? match.replace('token=', '') : null
    if (!token) return NextResponse.json({ user: null })

    const decoded = verifyToken(token)
    if (!decoded?.id) return NextResponse.json({ user: null })

    const user = await prisma.user.findUnique({ where: { id: decoded.id }, select: { id: true, email: true, name: true, role: true } })
    return NextResponse.json({ user: user ?? null })
  } catch (err) {
    console.error('me error:', err)
    return NextResponse.json({ user: null })
  }
}
