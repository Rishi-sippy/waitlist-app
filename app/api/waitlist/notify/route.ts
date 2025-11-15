import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PATCH(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) return NextResponse.json({ error: 'Missing waitlist ID' }, { status: 400 })

    await prisma.waitlist.update({
      where: { id },
      data: {
        notified: true,
        notifiedAt: new Date()
      }
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('NOTIFY ERROR:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
