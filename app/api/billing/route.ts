import { shopify } from '../../../lib/shopify'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { shop } = await request.json()

  if (!shop) return NextResponse.json({ error: 'Missing shop' }, { status: 400 })

  const billing = await shopify.billing.createSubscription({
    shop,
    returnUrl: `${process.env.SHOPIFY_APP_URL}/dashboard`,
    plan: {
      amount: 9.99,
      currencyCode: 'USD',
      interval: 'EVERY_30_DAYS',
      name: 'Pro Plan'
    }
  })

  return NextResponse.json({ confirmationUrl: billing.confirmationUrl })
}
