'use client';

import { motion } from 'framer-motion';
import { Upload, Layers, Palette, Zap, Share2, BarChart3 } from 'lucide-react';

const features = [
  { icon: Upload, title: 'Smart image upload', description: 'Drag-drop any room or exterior photo. AI instantly validates and classifies the image before processing.', color: 'bg-brand-50 text-brand-600' },
  { icon: Layers, title: 'Auto surface detection', description: 'Nano Banana AI segments walls, trim, and accent surfaces automatically. Click any spot to refine with SAM 2.', color: 'bg-violet-50 text-violet-600' },
  { icon: Palette, title: 'Real-time color application', description: 'WebGL canvas applies any shade instantly — luminance-preserving, photorealistic. Change 10 colors in a second.', color: 'bg-paint-50 text-paint-600' },
  { icon: Zap, title: 'Multi-brand catalog', description: 'Asian Paints at launch, Berger and Nerolac in Phase 2. Filter by color family, finish, LRV, and style.', color: 'bg-amber-50 text-amber-600' },
  { icon: Share2, title: 'WhatsApp sharing', description: 'Export a pixel-perfect PNG and share directly to WhatsApp — optimized for the Indian retail workflow.', color: 'bg-green-50 text-green-600' },
  { icon: BarChart3, title: 'Retailer dashboard', description: 'Track AI generation usage, manage projects, and monitor subscription limits from a clean dashboard.', color: 'bg-rose-50 text-rose-600' },
];

export default function Features() {
  return (
    <section id="features" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <div className="inline-block text-brand-600 font-semibold text-sm uppercase tracking-wider mb-4">Everything you need</div>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-5">Built for the paint counter</h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">Every feature is designed around one goal: help your customer say yes to a color faster.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="group p-8 rounded-2xl border border-stone-100 hover:border-stone-200 hover:shadow-lg transition-all bg-white">
              <div className={`inline-flex p-3 rounded-xl mb-5 ${f.color}`}><f.icon size={22} /></div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">{f.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
