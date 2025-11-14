// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword, generateToken } from '@/lib/auth'

type Body = {
  email: string
  password: string
  name?: string
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body
    const { email, password, name } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    const hashed = await hashPassword(password)
    const user = await prisma.user.create({
      data: { email, password: hashed, name }
    })

    const token = generateToken({ id: user.id })

    const res = NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } })
    // Set HttpOnly cookie
    res.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
      // maxAge optional; depends on JWT_EXPIRES_IN
    })

    return res
  } catch (err: any) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
