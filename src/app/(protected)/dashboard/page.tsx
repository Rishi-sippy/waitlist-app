'use client'

import React from 'react'
import { Activity, Settings, Bell, Plus, ChartLine } from 'lucide-react'
import Sidebar from '../Sidebar'

function StatCard({ title, value, delta, icon }: any) {
  return (
    <div className="rounded-2xl p-5 bg-[#0C1A23] border border-white/10 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-300">{title}</p>
          <p className="mt-2 text-2xl font-bold text-white">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-[#3CD5B0]/10">{React.createElement(icon, { size: 22, className: 'text-[#3CD5B0]' })}</div>
      </div>
      <div className="mt-3 text-sm text-[#3CD5B0]">{delta}</div>
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
      <path d={d} fill="none" stroke="#3CD5B0" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
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
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          {/* HEADER */}
          <header className="flex items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-[#3CD5B0]">Welcome back, Rishi 👋</h1>
              <p className="text-gray-400 mt-1">Here’s what's happening with your store today</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#3CD5B0] text-black font-semibold hover:bg-[#30b796] transition">
                <Plus size={16} /> Add product
              </button>
              <button className="p-3 rounded-lg bg-[#3CD5B0]/20 text-[#3CD5B0] hover:bg-[#3CD5B0]/30 transition">
                <Bell size={18} />
              </button>
            </div>
          </header>

          {/* STATS */}
          <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <StatCard key={s.title} {...s} />
            ))}
          </section>

          {/* CHART + RECENT */}
          <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0C1A23] border border-white/10 shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Signups this week</h2>
                <div className="text-sm text-[#3CD5B0]">Last 7 days</div>
              </div>

              <div className="mt-4">
                <Sparkline />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="px-4 py-2 rounded-lg bg-[#3CD5B0]/20 hover:bg-[#3CD5B0]/30">Export CSV</button>
                <button className="px-4 py-2 rounded-lg bg-[#3CD5B0] text-black hover:bg-[#30b796]">Send Campaign</button>
                <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">Manage Integrations</button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-6 rounded-2xl bg-[#0C1A23] border border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Waitlist Activity</h2>
                <span className="text-sm text-[#3CD5B0]">Showing last 3</span>
              </div>

              <ul className="mt-4 space-y-3">
                {recent.map((r) => (
                  <li key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div>
                      <div className="font-medium">
                        {r.name} <span className="text-xs text-gray-400">{r.id}</span>
                      </div>
                      <div className="text-sm text-[#3CD5B0]">{r.product}</div>
                    </div>
                    <div className="text-sm text-gray-300">{r.date}</div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 text-right">
                <a className="text-sm text-[#3CD5B0] hover:underline" href="#">
                  View all
                </a>
              </div>
            </div>
          </section>

          {/* Integrations + Timeline */}
          <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#0C1A23] border border-white/10">
              <h3 className="font-semibold">Integrations</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white">Shopify</div>
                    <div className="text-xs text-[#3CD5B0]">Connected</div>
                  </div>
                  <div className="text-xs text-gray-300">Health: Good</div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white">Twilio</div>
                    <div className="text-xs text-[#3CD5B0]">Connected</div>
                  </div>
                  <div className="text-xs text-gray-300">Quota OK</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C1A23] border border-white/10">
              <h3 className="font-semibold">Activity Timeline</h3>
              <ol className="mt-4 space-y-3 text-sm text-gray-300">
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
