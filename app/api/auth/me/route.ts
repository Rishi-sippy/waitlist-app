import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    // MUST AWAIT cookies()
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // The real field is userId (NOT id)
    const userId = decoded.id || decoded.userId
    if (!userId) {
      console.error('❌ JWT missing userId:', decoded)
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (err) {
    console.error('ME API ERROR:', err)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
