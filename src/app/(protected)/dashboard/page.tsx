'use client'

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-xl border">
          <p className="text-gray-500 text-sm">Total Waitlist Entries</p>
          <p className="text-3xl font-semibold mt-2">0</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl border">
          <p className="text-gray-500 text-sm">Notifications Sent</p>
          <p className="text-3xl font-semibold mt-2">0</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl border">
          <p className="text-gray-500 text-sm">Active Products</p>
          <p className="text-3xl font-semibold mt-2">0</p>
        </div>
      </div>

      {/* Recent Entries Table Placeholder */}
      <div className="bg-white border shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Waitlist Entries</h2>

        <div className="text-gray-500 text-sm">No entries yet. Once customers join your waitlist, they’ll appear here.</div>
      </div>
    </div>
  )
}
