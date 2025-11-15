import { shopifyApi, ApiVersion } from '@shopify/shopify-api'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: ['read_products', 'write_products', 'read_customers'],
  hostName: process.env.SHOPIFY_APP_URL!,
  apiVersion: ApiVersion.July24, // ✅ latest stable API version
  isEmbeddedApp: true
})
