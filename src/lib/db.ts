// src/lib/db.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // allow global prisma during dev to avoid creating multiple instances
  // eslint-disable-next-line no-var
  var __prisma: any, PrismaClient: any
}

export const prisma =
  global.__prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : []
  })

if (process.env.NODE_ENV === 'development') global.__prisma = prisma
