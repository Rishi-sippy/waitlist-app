'use client'

import { useState } from 'react'
import Link from 'next/link'
import PricingPlans from '@/components/Pricing'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#031022] text-white relative overflow-hidden">
      {/* FLOATING ELEMENTS */}
      <FloatingCard className="top-32 left-12 opacity-40" />
      <FloatingCard className="top-80 left-1/4 opacity-30" />
      <FloatingCard className="top-60 right-28 opacity-40" />
      <FloatingCard className="top-20 right-1/3 opacity-25" />

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <main className="max-w-5xl mx-auto text-center pt-32 pb-32 px-6 relative z-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">
          Let AI talk to your customers and
          <br />
          with <span className="text-[#3CD5B0]">drive conversions 24/7</span>
        </h1>

        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">Generate sales with SMS faster than ever. Our conversational AI turns customer chats into profitable conversions — automatically.</p>

        {/* CTA BUTTONS */}
        <div className="flex items-center justify-center gap-4 mt-10 flex-wrap">
          <Link href="#" className="bg-[#3CD5B0] hover:bg-[#3CD5B0] transition px-6 py-3 rounded-xl text-lg font-semibold">
            Start Free Trial
          </Link>

          <button className="border border-gray-500 hover:border-white transition px-6 py-3 rounded-xl text-lg font-semibold">Demo</button>
        </div>

        {/* TRUST BADGES */}
        <div className="mt-12 bg-[#04152e] border border-[#0f233f] rounded-full px-6 py-4 inline-flex gap-6 text-sm text-gray-300 backdrop-blur-md">
          <Badge text="14-day free trial" />
          <Badge text="10x ROI guarantee" />
          <Badge text="$1,000 in free credits" />
        </div>
      </main>
      <div>
        <PricingPlans />
      </div>
    </div>
  )
}

/* -----------------------------------------------------
   NAVBAR
----------------------------------------------------- */
function Navbar() {
  return (
    <header className="w-full backdrop-blur-sm bg-[#031022]/80 border-b border-[#0f233f] fixed top-0 z-30">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#3CD5B0] rounded-lg flex justify-center items-center font-bold text-white">WL</div>
          <span className="text-xl font-semibold">WAIT LIST</span>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <NavItem label="Why Us" />
          <NavItem label="Features" />
          <NavItem label="Industries" />
          <NavItem label="Partners" />
          <NavItem label="Resources" />
          <NavItem label="Pricing" />
        </div>

        {/* CTA BUTTONS */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="border border-[#3b4b63] hover:border-white px-4 py-2 rounded-lg">
            Login
          </Link>

          <Link href="/signup" className="bg-[#3CD5B0] hover:bg-[#3CD5B0] px-4 py-2 rounded-lg font-semibold">
            Start Free Trial
          </Link>
        </div>
      </nav>
    </header>
  )
}

/* -----------------------------------------------------
   REUSABLE COMPONENTS
----------------------------------------------------- */
function NavItem({ label }: { label: string }) {
  return <button className="hover:text-white transition">{label}</button>
}

function Badge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#3CD5B0]">✔</span>
      {text}
    </div>
  )
}

/* -----------------------------------------------------
   FLOATING BACKGROUND CARDS
----------------------------------------------------- */
function FloatingCard({ className }: { className?: string }) {
  return (
    <div
      className={`absolute w-40 h-28 rounded-xl bg-[#0b1f3c] border border-[#12325c] backdrop-blur-xl shadow-xl ${className}`}
      style={{
        transform: 'rotate(-5deg)'
      }}
    >
      <div className="w-full h-full opacity-30 bg-gradient-to-br from-[#3CD5B0] to-[#3CD5B0] rounded-xl blur-xl"></div>
    </div>
  )
}
