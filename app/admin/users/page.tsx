'use client'

import { useEffect, useState } from 'react'

export default function AllUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUsers() {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(data.users)
      setLoading(false)
    }
    loadUsers()
  }, [])

  if (loading) return <div className="text-white p-10">Loading users...</div>

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-extrabold text-[#3CD5B0] mb-6">All Registered Users</h1>

      <div className="overflow-hidden rounded-xl bg-[#0C1A23] border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-300">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Joined</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-white/10">
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 capitalize">{u.role}</td>
                <td className="p-4">{new Date(u.createdAt).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
