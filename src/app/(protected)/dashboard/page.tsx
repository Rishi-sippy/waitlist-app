'use client'

import { BarChart3, Settings, ShoppingBag, Users, ArrowUpRight } from 'lucide-react'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white p-8">
      {/* Page Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-yellow-400">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here’s your store performance at a glance.</p>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            label: 'Total Orders',
            value: '1,248',
            icon: ShoppingBag
          },
          {
            label: 'Active Customers',
            value: '3,920',
            icon: Users
          },
          {
            label: 'Revenue This Month',
            value: '$12,487',
            icon: BarChart3
          }
        ].map((item) => (
          <div key={item.label} className="p-6 rounded-2xl bg-[#141414] border border-yellow-500/20 hover:border-yellow-400 transition-all duration-300 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">{item.label}</span>
              <item.icon className="h-6 w-6 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold mt-2 text-yellow-300">{item.value}</p>
          </div>
        ))}
      </section>

      {/* Revenue Chart Placeholder */}
      <section className="bg-[#141414] border border-yellow-500/20 rounded-2xl p-6 shadow-md mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-yellow-300">Revenue Overview</h2>
          <ArrowUpRight className="h-5 w-5 text-yellow-400" />
        </div>

        <div className="h-56 flex items-center justify-center bg-[#0D0D0D] rounded-xl border border-yellow-500/10">
          <p className="text-gray-400 text-sm">(Chart will be added later)</p>
        </div>
      </section>

      {/* Footer CTA */}
      <footer>
        <div className="bg-[#141414] border border-yellow-500/20 rounded-2xl p-6 shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-yellow-300">Need to update your store settings?</h3>
            <p className="text-gray-400 text-sm mt-1">You can manage sales channels, app permissions, and billing.</p>
          </div>
          <button className="px-5 py-2 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all">Go to Settings</button>
        </div>
      </footer>
    </main>
  )
}
