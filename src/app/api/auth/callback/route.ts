import { shopify } from '@/lib/shopify'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const db = new PrismaClient()

export async function GET(request: Request) {
  try {
    const { session, shop, accessToken } = await shopify.auth.callback({
      rawRequest: request,
      rawResponse: new Response()
    })

    // Save shop to DB
    await db.shop.upsert({
      where: { domain: shop },
      update: { accessToken },
      create: {
        id: shop,
        domain: shop,
        accessToken
      }
    })

    return NextResponse.redirect(`/dashboard`)
  } catch (err: any) {
    console.error('OAuth callback error', err)
    return NextResponse.json({ error: 'OAuth callback failed', details: err?.message }, { status: 500 })
  }
}
