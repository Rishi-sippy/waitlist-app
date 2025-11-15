import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const token = req.headers
      .get('cookie')
      ?.split('; ')
      .find((c) => c.startsWith('token='))
      ?.split('=')[1]

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    if (decoded.role !== 'superadmin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ users })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
