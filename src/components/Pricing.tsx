'use client'
import React from 'react'
import { Check } from 'lucide-react'

const plans = [
  {
    title: 'Starter Plan',
    price: '₹999 / month',
    description: 'Perfect for growing businesses starting with AI SMS.',
    features: ['5,000 SMS credits / month', 'Automated AI replies', 'Basic campaign builder', 'Standard analytics', 'Email & chat support']
  },
  {
    title: 'Growth Plan',
    price: '₹2,999 / month',
    description: 'For e-commerce stores that want conversion-focused automation.',
    features: ['20,000 SMS credits / month', 'AI conversational flows', 'Abandoned cart recovery', 'Smart segmentation', 'Advanced reporting dashboard', 'Priority support']
  },
  {
    title: 'Enterprise Plan',
    price: 'Custom Pricing',
    description: 'For high-volume brands that need full AI automation.',
    features: ['Unlimited SMS credits', 'Custom AI model training', 'Personalised journeys & workflows', 'Multi-channel support (SMS + WhatsApp)', 'Dedicated account manager', 'API access & webhooks']
  }
]

const PricingPlans = () => {
  return (
    <section className="py-20 bg-[#031022] text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Choose the Perfect Plan</h2>
        <p className="text-gray-400 mb-14">Flexible, transparent pricing that grows with your business.</p>

        <div className="grid md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <div key={index} className="bg-[#031022] border border-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
              <p className="text-[#3CD5B0] text-xl font-semibold mb-4">{plan.price}</p>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

              <ul className="space-y-3 text-left">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="text-[#3CD5B0] w-5 h-5 mt-1" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-8 w-full bg-[#3CD5B0] text-white font-bold py-3 rounded-xl hover:bg-[#31b699] transition-all">Get Started</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingPlans
