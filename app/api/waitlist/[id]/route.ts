import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.waitlist.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('WAITLIST DELETE ERROR:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
