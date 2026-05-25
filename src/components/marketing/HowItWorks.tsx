'use client';

import { motion } from 'framer-motion';
import { ImagePlus, ScanLine, Paintbrush, Share2 } from 'lucide-react';

const steps = [
  { icon: ImagePlus, step: '01', title: 'Upload the photo', description: 'Customer or retailer uploads a photo of the room or exterior wall on any device.' },
  { icon: ScanLine, step: '02', title: 'AI segments surfaces', description: 'Nano Banana detects walls, trim, and accent areas automatically in seconds.' },
  { icon: Paintbrush, step: '03', title: 'Apply any shade', description: 'Pick from the full Asian Paints catalog. Changes are instant — no waiting, no reloads.' },
  { icon: Share2, step: '04', title: 'Share & close', description: 'Export to WhatsApp or print. Customer leaves with their shade code in hand.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <div className="inline-block text-brand-600 font-semibold text-sm uppercase tracking-wider mb-4">How it works</div>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-5">From photo to decision in 4 steps</h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">The whole flow takes under 30 seconds. Your customer walks in, you show them the colors, they choose.</p>
        </motion.div>
        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-stone-200 mx-32" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-stone-200 flex items-center justify-center shadow-sm z-10 relative"><s.icon size={24} className="text-brand-600" /></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">{i + 1}</div>
                </div>
                <div className="text-xs font-bold text-stone-400 tracking-widest mb-2">{s.step}</div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{s.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
