import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { productId, email, phone, name } = await req.json()

    if (!productId || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if already added
    const exists = await prisma.waitlist.findFirst({
      where: { productId, email }
    })

    if (exists) {
      return NextResponse.json({ error: 'Already in waitlist' }, { status: 409 })
    }

    const entry = await prisma.waitlist.create({
      data: {
        productId,
        email,
        phone,
        name
      }
    })

    return NextResponse.json({ success: true, entry })
  } catch (err) {
    console.error('WAITLIST ADD ERROR:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
