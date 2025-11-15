'use client'

import { useEffect, useState } from 'react'
import { User, Mail, Shield, Calendar, Save } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      setUser(data.user)
      setLoading(false)
    }
    loadUser()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading profile...</div>
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-red-400">Failed to load profile</div>
  }

  const avatarLetter = user.name?.charAt(0)?.toUpperCase() || 'U'

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto bg-[#0C1A23] border border-white/10 rounded-2xl p-8 shadow-lg">
        {/* HEADER */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#3CD5B0] flex items-center justify-center text-3xl font-bold text-black">{avatarLetter}</div>

          <div>
            <h1 className="text-3xl font-extrabold text-[#3CD5B0]">{user.name}</h1>
            <p className="text-gray-400">Manage your personal details</p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-10 space-y-6">
          {/* Name */}
          <div className="flex items-center gap-4">
            <User size={20} className="text-[#3CD5B0]" />
            <div>
              <p className="text-gray-400 text-sm">Full Name</p>
              <p className="text-lg font-medium">{user.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <Mail size={20} className="text-[#3CD5B0]" />
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-4">
            <Shield size={20} className="text-[#3CD5B0]" />
            <div>
              <p className="text-gray-400 text-sm">Role</p>
              <p className="text-lg font-medium capitalize">{user.role}</p>
            </div>
          </div>

          {/* Joined */}
          <div className="flex items-center gap-4">
            <Calendar size={20} className="text-[#3CD5B0]" />
            <div>
              <p className="text-gray-400 text-sm">Joined</p>
              <p className="text-lg font-medium">{new Date(user.createdAt).toDateString()}</p>
            </div>
          </div>
        </div>

        {/* SAVE BUTTON (future update functionality) */}
        <div className="mt-10 text-right">
          <button className="px-6 py-3 bg-[#3CD5B0] text-black font-semibold rounded-lg hover:bg-[#30b796] flex items-center gap-2 ml-auto">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
