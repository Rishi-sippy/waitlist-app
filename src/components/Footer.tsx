'use client'
import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-[#031022] text-white border-t border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-extrabold">WAIT LIST</h2>
          <p className="text-gray-400 mt-4">Real revenue, real time, real simple. AI-powered SMS automation that works from day one.</p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-[#3CD5B0] cursor-pointer">Home</li>
            <li className="hover:text-[#3CD5B0] cursor-pointer">Features</li>
            <li className="hover:text-[#3CD5B0] cursor-pointer">Pricing</li>
            <li className="hover:text-[#3CD5B0] cursor-pointer">Partners</li>
            <li className="hover:text-[#3CD5B0] cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Industry */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Industry</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-[#3CD5B0] cursor-pointer">Fashion & Apparel</li>
            <li className="hover:text-[#3CD5B0] cursor-pointer">Beauty & Cosmetics</li>
            <li className="hover:text-[#3CD5B0] cursor-pointer">Food & Beverage</li>
            <li className="hover:text-[#3CD5B0] cursor-pointer">Health & Wellness</li>
            <li className="hover:text-[#3CD5B0] cursor-pointer">Fitness</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>

          <div className="space-y-4 text-gray-400">
            <p className="flex items-center gap-3 hover:text-[#3CD5B0] cursor-pointer">
              <Mail className="w-5 h-5" /> support@yourbrand.com
            </p>

            <p className="flex items-center gap-3 hover:text-[#3CD5B0] cursor-pointer">
              <Phone className="w-5 h-5" /> +91 98765 43210
            </p>

            <div className="flex gap-4 mt-4">
              <Facebook className="cursor-pointer hover:text-[#3CD5B0] w-5 h-5" />
              <Twitter className="cursor-pointer hover:text-[#3CD5B0] w-5 h-5" />
              <Linkedin className="cursor-pointer hover:text-[#3CD5B0] w-5 h-5" />
              <Instagram className="cursor-pointer hover:text-[#3CD5B0] w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">© {new Date().getFullYear()} WAIT LIST. All Rights Reserved.</div>
    </footer>
  )
}

export default Footer
