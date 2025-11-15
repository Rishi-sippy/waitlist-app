'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Edit2, Trash2, User, DownloadCloud, Search, Plus } from 'lucide-react'

type UserItem = {
  id: string
  name?: string | null
  email: string
  role: 'user' | 'admin' | 'superadmin' | string
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('')
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Slide-over / editor state
  const [editingUser, setEditingUser] = useState<UserItem | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  // load users
  async function loadUsers() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(data.users || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  // derived list (search + filter)
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return users.filter((u) => {
      if (roleFilter && roleFilter !== '' && u.role !== roleFilter) return false
      if (!s) return true
      return (u.name || '').toLowerCase().includes(s) || u.email.toLowerCase().includes(s)
    })
  }, [users, search, roleFilter])

  // pagination
  const total = filtered.length
  const pages = Math.max(1, Math.ceil(total / pageSize))
  useEffect(() => {
    if (page > pages) setPage(1)
  }, [pages])

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, page, pageSize])

  function toggleSelect(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }))
  }

  function selectAllOnPage() {
    const map: Record<string, boolean> = {}
    paged.forEach((p) => (map[p.id] = true))
    setSelected(map)
  }

  function clearSelection() {
    setSelected({})
  }

  // bulk delete
  async function bulkDelete() {
    if (!confirm('Delete selected users? This action cannot be undone.')) return
    const ids = Object.keys(selected).filter((k) => selected[k])
    for (const id of ids) {
      await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    }
    await loadUsers()
    clearSelection()
  }

  // open editor
  function openEditor(user: UserItem) {
    setEditingUser(user)
    setIsOpen(true)
  }

  async function saveUser(e: React.FormEvent) {
    e.preventDefault()
    if (!editingUser) return
    const form = new FormData(e.target as HTMLFormElement)
    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const role = String(form.get('role') || 'user')

    await fetch(`/api/admin/users/${editingUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role })
    })

    setIsOpen(false)
    setEditingUser(null)
    await loadUsers()
  }

  async function deleteUser(id: string) {
    if (!confirm('Delete this user?')) return
    await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    await loadUsers()
  }

  function exportCSV() {
    const rows = filtered.map((u) => ({
      id: u.id,
      name: u.name || '',
      email: u.email,
      role: u.role,
      createdAt: u.createdAt
    }))
    const headers = Object.keys(rows[0] || {})
    const csv = [headers.join(',')].concat(rows.map((r) => headers.map((h) => `"${String((r as any)[h] || '').replace(/"/g, '""')}"`).join(','))).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      {/* Header + actions */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#3CD5B0]">Manage Users</h1>
          <p className="text-sm text-gray-400 mt-1">Overview and management for your workspace users</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={exportCSV} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded text-sm hover:bg-white/6">
            <DownloadCloud size={16} /> Export CSV
          </button>

          <button
            onClick={() => {
              // open blank create modal
              const blank: UserItem = { id: 'new', email: '', role: 'user', createdAt: new Date().toISOString() }
              setEditingUser(blank)
              setIsOpen(true)
            }}
            className="flex items-center gap-2 bg-[#3CD5B0] text-black px-4 py-2 rounded text-sm hover:bg-[#30b796]"
          >
            <Plus size={16} /> Add New User
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-5 bg-[#0C1A23] rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Total Users</p>
          <p className="text-2xl font-bold text-white mt-2">{users.length}</p>
        </div>

        <div className="p-5 bg-[#0C1A23] rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Superadmins</p>
          <p className="text-2xl font-bold text-purple-400 mt-2">{users.filter((u) => u.role === 'superadmin').length}</p>
        </div>

        <div className="p-5 bg-[#0C1A23] rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Admins</p>
          <p className="text-2xl font-bold text-blue-400 mt-2">{users.filter((u) => u.role === 'admin').length}</p>
        </div>

        <div className="p-5 bg-[#0C1A23] rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">New (7 days)</p>
          <p className="text-2xl font-bold text-green-400 mt-2">{users.filter((u) => Date.now() - new Date(u.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000).length}</p>
        </div>
      </div>

      {/* search + filters + bulk actions */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." className="pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 outline-none w-72" />
          </div>

          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="p-3 bg-white/5 border border-white/10 rounded-lg">
            <option value="">All roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>

          <div className="flex items-center gap-2">
            <button onClick={selectAllOnPage} className="px-3 py-2 bg-white/5 rounded">
              Select page
            </button>
            <button onClick={clearSelection} className="px-3 py-2 bg-white/5 rounded">
              Clear
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-400">Bulk actions:</div>
          <button onClick={bulkDelete} className="px-4 py-2 bg-red-700/30 rounded text-red-400">
            Delete Selected
          </button>
        </div>
      </div>

      {/* table */}
      <div className="overflow-hidden rounded-xl bg-[#0C1A23] border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-300">
            <tr>
              <th className="p-4 w-12"> </th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Joined</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            ) : (
              paged.map((u) => (
                <tr key={u.id} className="border-t border-white/10">
                  <td className="p-4">
                    <input checked={!!selected[u.id]} onChange={() => toggleSelect(u.id)} type="checkbox" />
                  </td>

                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center text-sm font-semibold text-white">{u.name ? u.name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="font-medium">{u.name || '—'}</div>
                      <div className="text-xs text-gray-400">{u.id}</div>
                    </div>
                  </td>

                  <td className="p-4">{u.email}</td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-xl bg-white/10 text-[#3CD5B0] text-xs capitalize">{u.role}</span>
                  </td>

                  <td className="p-4">{new Date(u.createdAt).toLocaleString()}</td>

                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEditor(u)} className="p-2 rounded-lg bg-white/6 hover:bg-white/8">
                        <Edit2 size={16} />
                      </button>

                      <button onClick={() => deleteUser(u.id)} className="p-2 rounded-lg bg-red-700/10 hover:bg-red-700/20">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-400">
          Showing {paged.length} of {filtered.length} users
        </div>

        <div className="flex items-center gap-2">
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="p-2 bg-white/5 rounded">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>

          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-2 bg-white/5 rounded">
            Prev
          </button>
          <div className="px-3 py-2 bg-white/6 rounded">
            {page} / {pages}
          </div>
          <button onClick={() => setPage((p) => Math.min(pages, p + 1))} className="px-3 py-2 bg-white/5 rounded">
            Next
          </button>
        </div>
      </div>

      {/* Slide-over editor */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              setIsOpen(false)
              setEditingUser(null)
            }}
          />

          <aside className="relative ml-auto w-full md:w-2/5 bg-[#071217] p-6 overflow-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#3CD5B0]">{editingUser?.id === 'new' ? 'Create User' : 'Edit User'}</h2>
              <button
                onClick={() => {
                  setIsOpen(false)
                  setEditingUser(null)
                }}
                className="p-2"
              >
                Close
              </button>
            </div>

            <form onSubmit={saveUser} className="mt-6 space-y-4">
              <label className="block">
                <div className="text-sm text-gray-400">Full name</div>
                <input name="name" defaultValue={editingUser?.name || ''} className="w-full p-3 rounded bg-white/5" />
              </label>

              <label className="block">
                <div className="text-sm text-gray-400">Email</div>
                <input name="email" defaultValue={editingUser?.email || ''} className="w-full p-3 rounded bg-white/5" />
              </label>

              <label className="block">
                <div className="text-sm text-gray-400">Role</div>
                <select name="role" defaultValue={editingUser?.role || 'user'} className="w-full p-3 rounded bg-white/5">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </select>
              </label>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    setEditingUser(null)
                  }}
                  className="px-4 py-2 bg-white/6 rounded"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#3CD5B0] text-black rounded">Save</button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </div>
  )
}
