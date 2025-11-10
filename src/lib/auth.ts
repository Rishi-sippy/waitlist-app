// src/lib/auth.ts
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/db'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d' // e.g. 7d

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment')
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function comparePassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed)
}

export function generateToken(payload: Record<string, any>) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any
  } catch (e) {
    return null
  }
}

/**
 * Reads 'token' cookie from NextRequest and returns user or null
 */
export async function getUserFromRequest(req: NextRequest) {
  const cookie = req.cookies.get('token')?.value
  if (!cookie) return null
  const decoded = verifyToken(cookie)
  if (!decoded?.id) return null
  const user = await prisma.user.findUnique({ where: { id: decoded.id } })
  return user
}
