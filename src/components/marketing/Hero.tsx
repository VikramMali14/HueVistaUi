'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const SWATCH_COLORS = [
  '#e63946', '#f4a261', '#2a9d8f', '#264653', '#e9c46a',
  '#8338ec', '#3a86ff', '#fb8500', '#06d6a0', '#ef476f',
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-stone-900">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-stone-900 to-stone-950" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {SWATCH_COLORS.map((color, i) => (
          <motion.div
            key={i}
            className="absolute rounded-2xl opacity-20"
            style={{
              backgroundColor: color,
              width: 80 + (i % 3) * 40,
              height: 80 + (i % 3) * 40,
              left: `${(i * 11) % 90}%`,
              top: `${(i * 17) % 80}%`,
            }}
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-32 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white"
        >
          <div className="inline-flex items-center gap-2 bg-brand-600/20 border border-brand-400/30 rounded-full px-4 py-1.5 text-brand-300 text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            Built for Indian Paint Retailers
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Show colors,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-paint-400 to-paint-600">
              close sales.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-stone-300 mb-10 max-w-xl leading-relaxed">
            Upload a photo of any room or exterior. Apply Asian Paints, Berger, or Nerolac shades
            in real-time. Show customers exactly how their walls will look — before a single stroke.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 hover:bg-brand-500 rounded-xl text-white font-semibold text-base transition-all shadow-lg shadow-brand-900/40"
            >
              Start free trial <ArrowRight size={18} />
            </Link>
            <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white font-semibold text-base transition-all">
              <Play size={16} className="fill-white" /> Watch demo
            </button>
          </div>

          <div className="mt-12 flex items-center gap-6 text-stone-400 text-sm">
            <div>
              <span className="text-white font-bold text-2xl">200+</span>
              <br />paint shades
            </div>
            <div className="w-px h-10 bg-stone-700" />
            <div>
              <span className="text-white font-bold text-2xl">&lt;10s</span>
              <br />to first preview
            </div>
            <div className="w-px h-10 bg-stone-700" />
            <div>
              <span className="text-white font-bold text-2xl">3</span>
              <br />major brands
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative bg-stone-800 rounded-3xl overflow-hidden shadow-2xl border border-stone-700">
            <div className="flex items-center gap-2 px-4 py-3 bg-stone-900/80 border-b border-stone-700">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-4 flex-1 bg-stone-700 rounded h-5 text-xs text-stone-400 flex items-center px-3">
                app.huevista.com/projects/preview
              </div>
            </div>
            <div className="h-72 bg-gradient-to-br from-stone-600 to-stone-800 relative flex items-end">
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-[#2a9d8f]/40" />
                <div className="w-32 bg-[#e9c46a]/30" />
              </div>
              <div className="relative z-10 px-4 pb-4 w-full flex justify-between items-end">
                <div className="bg-white/10 backdrop-blur rounded-lg px-3 py-2 text-white text-xs">
                  🎨 Main wall: Teal Shore 7849
                </div>
                <div className="bg-brand-600 rounded-lg px-3 py-2 text-white text-xs font-semibold">
                  Apply color
                </div>
              </div>
            </div>
            <div className="px-4 py-3 flex gap-2 overflow-x-auto">
              {SWATCH_COLORS.slice(0, 6).map((c) => (
                <div
                  key={c}
                  className="w-10 h-10 rounded-lg shrink-0 ring-2 ring-white/10 cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: c }}
                />
              ))}
              <div className="w-10 h-10 rounded-lg shrink-0 bg-stone-700 text-stone-400 flex items-center justify-center text-xs">
                +194
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 bg-paint-500 text-white rounded-2xl px-4 py-2 text-sm font-bold shadow-lg rotate-3">
            Real-time preview ✓
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-500">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="w-px h-8 bg-stone-600"
        />
      </div>
    </section>
  );
}
