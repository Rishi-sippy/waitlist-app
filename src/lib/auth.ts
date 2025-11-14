// src/lib/auth.ts
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// hash user password
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// compare passwords
export async function comparePassword(plain: string, hashed: string) {
  return bcrypt.compare(plain, hashed)
}

// generate JWT token
export function generateToken(payload: any) {
  const secret = process.env.JWT_SECRET || 'dev_secret_key'
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

// verify JWT
export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET || 'dev_secret_key'
  return jwt.verify(token, secret)
}
