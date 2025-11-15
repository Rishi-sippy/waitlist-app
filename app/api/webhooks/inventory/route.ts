import { shopify } from '../../../../lib/shopify'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.text()

    const verified = await shopify.webhooks.validate({
      rawBody: body,
      rawRequest: request
    })

    if (!verified.valid) {
      return NextResponse.json({ error: 'Webhook not verified' }, { status: 401 })
    }

    const event = JSON.parse(body)

    console.log('✅ Inventory webhook received:', event)

    // TODO: Add queue job to notify waitlist customers

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Webhook error', e)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
