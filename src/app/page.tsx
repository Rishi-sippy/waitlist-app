'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check, Zap, MessageCircle, ServerCog, Cpu } from 'lucide-react'

export default function HomePage() {
  const [showWidgetPreview, setShowWidgetPreview] = useState(true)
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({})

  const toggleFaq = (i: number) => {
    setFaqOpen((s) => ({ ...s, [i]: !s[i] }))
  }

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between border-b border-gray-200/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-black text-white flex items-center justify-center font-bold">CS</div>
          <div>
            <h2 className="text-lg font-semibold">Cold Strangers</h2>
            <div className="text-xs text-gray-500">Waitlist & Outreach</div>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/pricing" className="text-gray-700 hover:text-black">
            Pricing
          </Link>
          <Link href="/login" className="hidden sm:inline-block bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-900">
            Sign in
          </Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        {/* HERO */}
        <section className="grid gap-8 md:grid-cols-2 items-center mt-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Turn out-of-stock moments into more customers</h1>
            <p className="mt-4 text-gray-600 max-w-xl">Capture waitlist signups, notify customers via email & SMS, and let an AI agent follow-up automatically — all through a lightweight widget that takes minutes to install.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/signup" className="inline-block bg-black text-white px-5 py-3 rounded-md font-semibold hover:bg-gray-900">
                Start free trial
              </Link>

              <button onClick={() => setShowWidgetPreview((s) => !s)} className="inline-flex items-center gap-2 px-4 py-3 rounded-md border border-gray-300 hover:bg-gray-100">
                {showWidgetPreview ? 'Hide' : 'Show'} widget preview
              </button>

              <a href="#pricing" className="inline-block px-4 py-3 rounded-md text-gray-600 hover:text-black">
                See pricing
              </a>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
              <Stat label="AI Agent" sub="Automated conversations" />
              <Stat label="Resend & Twilio" sub="Email + SMS alerts" />
              <Stat label="Prisma DB" sub="Fast & reliable ORM" />
              <Stat label="AWS Ready" sub="Scalable hosting soon" />
            </div>
          </div>

          {/* Widget Preview */}
          <div>
            <div className="rounded-2xl p-6 bg-gray-50 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Live widget preview</div>
                  <div className="text-sm text-gray-700">What your customers will see</div>
                </div>

                <button onClick={() => setShowWidgetPreview((s) => !s)} className="px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-100 text-sm">
                  Toggle
                </button>
              </div>

              <div className="mt-4">{showWidgetPreview ? <WidgetMock /> : <WidgetPlaceholder />}</div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="mt-16">
          <h3 className="text-2xl font-semibold">Core features</h3>
          <p className="mt-2 text-gray-600 max-w-xl">Everything you need to capture demand and notify your customers automatically.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard icon={<Zap size={20} />} title="Lightweight widget" desc="Collect waitlist entries without slowing your site." />
            <FeatureCard icon={<MessageCircle size={20} />} title="AI agent" desc="AI follows up with customers instantly & intelligently." />
            <FeatureCard icon={<Check size={20} />} title="Email & SMS alerts" desc="Instant alerts via Resend + Twilio integrations." />
            <FeatureCard icon={<ServerCog size={20} />} title="Reliable backend" desc="Prisma ORM + SQL ensure accurate & scalable data." />
            <FeatureCard icon={<Cpu size={20} />} title="Background jobs" desc="Retry logic, queue system & automated tasks." />
            <FeatureCard icon={<Check size={20} />} title="Analytics-ready" desc="Insights you need for growth & conversions." />
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mt-16">
          <h3 className="text-2xl font-semibold">Pricing</h3>
          <p className="mt-2 text-gray-600 max-w-xl">Simple, transparent plans for all business sizes.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <PricingCard tier="Free" price="$0" bullets={['100 signups / month', 'Email notifications', 'Community support']} />
            <PricingCard tier="Pro" price="$29" bullets={['5000 signups / month', 'SMS alerts', 'AI agent included']} highlight />
            <PricingCard tier="Enterprise" price="Contact" bullets={['Unlimited', 'Advanced analytics', 'Dedicated support']} />
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-16">
          <h3 className="text-2xl font-semibold">Trusted by early users</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <Testimonial name="Priya S." role="Founder" text="The waitlist increased our conversion by 18% immediately." />
            <Testimonial name="Amit V." role="Growth Lead" text="AI agent saved our team countless hours." />
            <Testimonial name="Neha G." role="Ops Manager" text="Email + SMS automation works flawlessly." />
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h3 className="text-2xl font-semibold">FAQ</h3>

          <div className="mt-4 space-y-3">
            {[
              { q: 'How do I install the widget?', a: 'Paste a short script or use the one-click setup.' },
              { q: 'Does it support email & SMS?', a: 'Yes, through Resend (email) & Twilio (SMS).' },
              { q: 'Is there an AI assistant?', a: 'Yes, it automatically engages and follows up with users.' },
              { q: 'Where is it hosted?', a: 'Vercel for development; AWS for production scaling.' }
            ].map((f, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4">
                <button onClick={() => toggleFaq(i)} className="w-full flex items-center justify-between">
                  <div>
                    <div className="font-medium">{f.q}</div>
                  </div>
                  <div>{faqOpen[i] ? '−' : '+'}</div>
                </button>
                {faqOpen[i] && <div className="mt-3 text-sm text-gray-600">{f.a}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 bg-gray-50 border border-gray-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Ready to grow faster?</h3>
            <p className="text-gray-600 mt-1">Start for free — upgrade anytime.</p>
          </div>

          <div className="flex gap-3">
            <Link href="/signup" className="bg-black text-white px-5 py-3 rounded-md font-semibold hover:bg-gray-900">
              Start free trial
            </Link>
            <Link href="/pricing" className="px-4 py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100">
              See pricing
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-16 border-t border-gray-200 pt-8 pb-12 text-sm text-gray-600">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
            <div>© {new Date().getFullYear()} Cold Strangers • All rights reserved</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-black">
                Privacy
              </a>
              <a href="#" className="hover:text-black">
                Terms
              </a>
              <a href="#" className="hover:text-black">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

/* COMPONENTS */

function Stat({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
      <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center">
        <Check size={18} className="text-black" />
      </div>
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-gray-600">{sub}</div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded bg-gray-100 text-black">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-gray-600 mt-1">{desc}</div>
        </div>
      </div>
    </div>
  )
}

function PricingCard({ tier, price, bullets, highlight }: { tier: string; price: string; bullets: string[]; highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-2xl border shadow-sm ${highlight ? 'border-black bg-black text-white' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className={`${highlight ? 'text-gray-200' : 'text-gray-600'}`}>{tier}</div>
          <div className="text-3xl font-bold">{price}</div>
        </div>
        {highlight && <div className="text-xs bg-white text-black px-3 py-1 rounded">Popular</div>}
      </div>

      <ul className={`mt-4 space-y-2 text-sm ${highlight ? 'text-gray-100' : 'text-gray-700'}`}>
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link href="/signup" className={`inline-block w-full text-center px-4 py-2 rounded-md ${highlight ? 'bg-white text-black' : 'border border-gray-300 text-black hover:bg-gray-100'}`}>
          Get started
        </Link>
      </div>
    </div>
  )
}

function Testimonial({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
      <div className="text-gray-800">{text}</div>
      <div className="mt-4 text-sm font-medium">
        {name} <span className="text-gray-500">— {role}</span>
      </div>
    </div>
  )
}

/* WIDGET MOCK */

function WidgetMock() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="max-w-sm w-full border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <div className="text-sm font-semibold">Join the waitlist</div>
      <div className="text-xs text-gray-600 mt-1">Get notified when this product is back.</div>

      {!submitted ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
          className="mt-4 space-y-3"
        >
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 rounded bg-gray-50 border border-gray-300 text-sm" />

          <button className="w-full bg-black text-white p-2 rounded font-semibold">Join Waitlist</button>
        </form>
      ) : (
        <div className="mt-4 p-3 rounded bg-gray-100 text-gray-700">Thank you! You’ll be notified soon.</div>
      )}
    </div>
  )
}

function WidgetPlaceholder() {
  return <div className="max-w-sm w-full border border-gray-200 rounded-lg p-6 bg-gray-50 flex items-center justify-center text-gray-600">Widget preview hidden</div>
}
