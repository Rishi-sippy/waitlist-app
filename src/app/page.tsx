import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-900">Shopify Waitlist App</h1>

        <p className="text-gray-600 mt-4">Collect customer waitlist entries when your products go out of stock. Send email & SMS notifications automatically when restocked.</p>

        <a href="/api/auth/install?shop=" className="inline-block mt-8 px-6 py-3 bg-black text-white rounded-xl text-lg hover:bg-gray-900 transition">
          Install App
        </a>

        <div className="mt-10 p-6 bg-white shadow rounded-xl border">
          <h2 className="text-xl font-semibold">Why this App?</h2>
          <ul className="text-gray-600 mt-3 space-y-2 text-left">
            <li>✅ Capture emails and phone numbers on OOS products</li>
            <li>✅ Automated SMS & Email restock notifications</li>
            <li>✅ Simple embed widget</li>
            <li>✅ Dashboard for analytics</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
