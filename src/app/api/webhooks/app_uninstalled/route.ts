import { shopify } from '@/lib/shopify'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const db = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const verified = await shopify.webhooks.validate({
      rawBody: body,
      rawRequest: request
    })

    if (!verified.valid) {
      return NextResponse.json({ error: 'Invalid webhook' }, { status: 401 })
    }

    const payload = JSON.parse(body)
    const shop = payload?.domain

    if (shop) {
      await db.shop.delete({ where: { domain: shop } })
      console.log('✅ App uninstalled, shop removed:', shop)
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('App uninstall webhook error:', e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
