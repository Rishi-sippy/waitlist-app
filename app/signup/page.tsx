'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      })
      const data = await res.json()
      setLoading(false)
      if (!res.ok) {
        setError(data?.error || 'Registration failed')
        return
      }
      window.location.href = '/dashboard'
    } catch (err: any) {
      setLoading(false)
      setError('Network error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C1A23] p-6">
      <div className="max-w-md w-full bg-black rounded-2xl border border-white/10 shadow-xl p-10">
        <h2 className="text-3xl font-extrabold mb-8 tracking-wide text-[#3CD5B0]">Create account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name (optional)"
            className="w-full p-4 rounded-lg bg-[#0C1A23] border border-white/20 text-white placeholder-[#3CD5B0] focus:outline-none focus:ring-2 focus:ring-[#3CD5B0] transition"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
            className="w-full p-4 rounded-lg bg-[#0C1A23] border border-white/20 text-white placeholder-[#3CD5B0] focus:outline-none focus:ring-2 focus:ring-[#3CD5B0] transition"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
            className="w-full p-4 rounded-lg bg-[#0C1A23] border border-white/20 text-white placeholder-[#3CD5B0] focus:outline-none focus:ring-2 focus:ring-[#3CD5B0] transition"
          />
          {error && <div className="text-red-500 text-center font-medium">{error}</div>}
          <button disabled={loading} className="w-full bg-[#3CD5B0] hover:bg-[#30b796] text-black py-4 rounded-lg font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition">
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-[#3CD5B0] font-semibold hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
