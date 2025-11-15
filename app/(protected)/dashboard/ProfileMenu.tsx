'use client'

import { useState, useRef, useEffect } from 'react'
import { User, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Icon */}
      <button onClick={() => setOpen(!open)} className="p-3 rounded-full bg-[#3CD5B0]/20 text-[#3CD5B0] hover:bg-[#3CD5B0]/30 transition">
        <User size={18} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#0C1A23] border border-white/10 shadow-xl p-2 z-50">
          <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-sm text-white">
            <User size={16} className="text-[#3CD5B0]" />
            Profile
          </Link>

          <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-sm text-white">
            <Settings size={16} className="text-[#3CD5B0]" />
            Settings
          </Link>

          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' })
              window.location.href = '/login'
            }}
            className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-sm text-red-400"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
