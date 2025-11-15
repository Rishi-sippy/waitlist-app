import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: Request, { params }: { params: { productId: string } }) {
  try {
    const { productId } = params

    const entries = await prisma.waitlist.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ entries })
  } catch (err) {
    console.error('WAITLIST FETCH ERROR:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
