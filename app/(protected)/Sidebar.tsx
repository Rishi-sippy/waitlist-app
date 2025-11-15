'use client'

import Link from 'next/link'
import { Home, Settings, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)

  // Load current logged-in user
  useEffect(() => {
    async function loadUser() {
      const res = await fetch('/api/auth/me')
      const data = await res.json()
      setUser(data.user)
    }
    loadUser()
  }, [])

  const menu = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Settings', href: '/settings', icon: Settings }
  ]

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col gap-4 fixed top-0 left-0">
      <h1 className="text-xl font-bold text-[#3CD5B0] mb-6">My Panel</h1>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center text-[#3CD5B0] gap-3 p-3 rounded-xl transition
                  ${active ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              <Icon size={20} />
              <span className="text-[#3CD5B0]">{item.name}</span>
            </Link>
          )
        })}

        {/* SUPERADMIN-ONLY MENU */}
        {user?.role === 'superadmin' && (
          <Link
            href="/admin/users"
            className={`flex items-center text-[#3CD5B0] gap-3 p-3 rounded-xl transition
               ${pathname === '/admin/users' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
          >
            <Users size={20} />
            <span className="text-[#3CD5B0]">Users</span>
          </Link>
        )}
      </nav>
    </aside>
  )
}
