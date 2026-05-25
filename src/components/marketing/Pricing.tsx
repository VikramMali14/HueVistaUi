'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  { name: 'Starter', price: '₹499', per: 'per month', description: 'Great for a single outlet just getting started.', ai: '20 AI generations/mo', features: ['Core visualization', 'WhatsApp share', 'Asian Paints catalog', 'PNG export'], cta: 'Get started', highlighted: false },
  { name: 'Professional', price: '₹999', per: 'per month', description: 'For active retailers who see 20+ customers a week.', ai: '60 AI generations/mo', features: ['Everything in Starter', 'AI color recommendations', 'Project history', 'Priority support'], cta: 'Start free trial', highlighted: true },
  { name: 'Business', price: '₹1,999', per: 'per month', description: 'Multi-staff stores with a branded customer portal.', ai: '150 AI generations/mo', features: ['Everything in Professional', 'White-label portal', 'Customer access codes', 'Painter accounts'], cta: 'Get started', highlighted: false },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-block text-brand-600 font-semibold text-sm uppercase tracking-wider mb-4">Simple pricing</div>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-5">Pay for what you use</h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">2D color application is always unlimited. You pay for AI-powered renders only. No hidden fees. Cancel any time.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className={`rounded-2xl p-8 border ${plan.highlighted ? 'bg-brand-900 border-brand-700 text-white shadow-2xl scale-105' : 'bg-white border-stone-200'}`}>
              {plan.highlighted && <div className="text-xs font-bold uppercase tracking-widest text-brand-300 mb-4">Most popular</div>}
              <div className={`text-sm font-semibold mb-1 ${plan.highlighted ? 'text-brand-300' : 'text-stone-500'}`}>{plan.name}</div>
              <div className="flex items-end gap-1 mb-2">
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-stone-900'}`}>{plan.price}</span>
                <span className={`text-sm mb-1 ${plan.highlighted ? 'text-brand-300' : 'text-stone-400'}`}>{plan.per}</span>
              </div>
              <p className={`text-sm mb-5 ${plan.highlighted ? 'text-brand-200' : 'text-stone-500'}`}>{plan.description}</p>
              <div className={`text-xs font-semibold rounded-lg px-3 py-2 mb-6 ${plan.highlighted ? 'bg-brand-800 text-brand-200' : 'bg-stone-100 text-stone-600'}`}>{plan.ai}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-brand-300' : 'text-brand-600'}`} />
                    <span className={plan.highlighted ? 'text-stone-200' : 'text-stone-600'}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${plan.highlighted ? 'bg-white text-brand-900 hover:bg-brand-50' : 'bg-brand-600 text-white hover:bg-brand-700'}`}>{plan.cta}</Link>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-stone-400 text-sm mt-10">Need unlimited generations? <a href="mailto:hello@huevista.com" className="text-brand-600 hover:underline">Contact us for Enterprise pricing.</a></p>
      </div>
    </section>
  );
}
