'use client'

import React from 'react'
import { Activity, Settings, Bell, Plus, ChartLine } from 'lucide-react'
import Sidebar from '../Sidebar'

function StatCard({ title, value, delta, icon }: any) {
  return (
    <div className="rounded-2xl p-5 bg-gradient-to-br from-cyan-600/10 via-teal-600/8 to-white/5 border border-white/5 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-300">{title}</p>
          <p className="mt-2 text-2xl font-bold text-white">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-white/6">{React.createElement(icon, { size: 22, className: 'text-cyan-300' })}</div>
      </div>
      <div className="mt-3 text-sm text-cyan-200">{delta}</div>
    </div>
  )
}

function Sparkline({ points = [10, 20, 8, 28, 16, 34, 24] }: any) {
  const width = 300
  const height = 60
  const max = Math.max(...points)
  const min = Math.min(...points)
  const scaleX = (i: number) => (i / (points.length - 1)) * width
  const scaleY = (v: number) => height - ((v - min) / (max - min || 1)) * height
  const d = points.map((p: number, i: number) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(p)}`).join(' ')

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="block">
      <path d={d} fill="none" stroke="#06b6d4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" opacity={0.95} />
    </svg>
  )
}

export default function DashboardPage() {
  const stats = [
    { title: 'Waitlist Signups', value: '1,284', delta: '+12% vs last week', icon: Activity },
    { title: 'Notifications Sent', value: '3,210', delta: '+2.3% vs last week', icon: Bell },
    { title: 'Active Products', value: '48', delta: 'Stable', icon: ChartLine },
    { title: 'Revenue (est)', value: '$8.7k', delta: '+8% vs last week', icon: Settings }
  ]

  const recent = [
    { id: '#WL-1021', name: 'Priya Sharma', product: 'Blue Hoodie - M', date: '2 hours ago' },
    { id: '#WL-1020', name: 'Amit Verma', product: 'Sneaker Model X', date: '6 hours ago' },
    { id: '#WL-1019', name: 'Neha Gupta', product: 'Vintage Tee', date: '1 day ago' }
  ]

  return (
    <div className="min-h-screen bg-[#071A1C] text-white">
      <div className="flex">
        <Sidebar />

        <main className="ml- flex-1 p-8">
          <header className="flex items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-teal-200">Welcome back, Rishi</h1>
              <p className="text-cyan-200/80 mt-1">Here’s what’s happening with your store today</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/6 hover:bg-white/8">
                <Plus size={16} /> Add product
              </button>
              <button className="p-3 rounded-lg bg-white/6 hover:bg-white/8">
                <Bell size={18} />
              </button>
            </div>
          </header>

          {/* Stats */}
          <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <StatCard key={s.title} {...s} />
            ))}
          </section>

          <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart & Quick Actions */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-teal-800/20 to-cyan-900/10 border border-white/5 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Signups this week</h2>
                <div className="text-sm text-cyan-200">Last 7 days</div>
              </div>

              <div className="mt-4">
                <Sparkline />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30">Export CSV</button>
                <button className="px-4 py-2 rounded-lg bg-cyan-600">Send Campaign</button>
                <button className="px-4 py-2 rounded-lg bg-white/6">Manage Integrations</button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/10 to-teal-900/6 border border-white/5 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Waitlist Activity</h2>
                <span className="text-sm text-cyan-200">Showing last 3</span>
              </div>

              <ul className="mt-4 space-y-3">
                {recent.map((r) => (
                  <li key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-white/3">
                    <div>
                      <div className="font-medium">
                        {r.name} <span className="text-xs text-cyan-100/70">{r.id}</span>
                      </div>
                      <div className="text-sm text-cyan-200">{r.product}</div>
                    </div>
                    <div className="text-sm text-cyan-200">{r.date}</div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 text-right">
                <a className="text-sm text-cyan-300 hover:underline" href="#">
                  View all
                </a>
              </div>
            </div>
          </section>

          {/* Activity timeline and integrations */}
          <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-semibold">Integrations</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm">Shopify</div>
                    <div className="text-xs text-cyan-200">Connected</div>
                  </div>
                  <div className="text-xs">Health: Good</div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm">Twilio</div>
                    <div className="text-xs text-cyan-200">Connected</div>
                  </div>
                  <div className="text-xs">Quota OK</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-semibold">Activity Timeline</h3>
              <ol className="mt-4 space-y-3 text-sm text-cyan-200">
                <li>• Inventory for "Blue Hoodie" restocked — 2h ago</li>
                <li>• Sent campaign to 120 customers — 5h ago</li>
                <li>• Webhook retry success — 1 day ago</li>
              </ol>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
