'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Loader2 } from 'lucide-react';
import { shadeApi } from '@/lib/api';
import { contrastColor } from '@/lib/utils';
import type { Shade, ColorFamily, Finish } from '@/types';

const FAMILIES: ColorFamily[] = ['RED','ORANGE','YELLOW','GREEN','BLUE','PURPLE','PINK','BROWN','GREY','WHITE'];
const FINISHES: Finish[] = ['MATTE','EGGSHELL','SATIN','SEMI_GLOSS','GLOSS'];
const FINISH_LABEL: Record<Finish, string> = { MATTE:'Matte',EGGSHELL:'Eggshell',SATIN:'Satin',SEMI_GLOSS:'Semi-gloss',GLOSS:'Gloss' };

export default function CatalogContent() {
  const [search, setSearch] = useState('');
  const [family, setFamily] = useState<ColorFamily | ''>('');
  const [finish, setFinish] = useState<Finish | ''>('');
  const [selected, setSelected] = useState<Shade | null>(null);

  const { data: shades, isLoading } = useQuery<Shade[]>({
    queryKey: ['shades-catalog', search, family, finish],
    queryFn: async () => { const { data } = await shadeApi.list({ search: search || undefined, colorFamily: family || undefined, finish: finish || undefined, size: 200 }); return data.content ?? data; },
    staleTime: 60_000,
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8"><h1 className="text-2xl font-bold text-stone-900 mb-1">Shade catalog</h1><p className="text-stone-500 text-sm">Browse all Asian Paints shades. Click any swatch for details.</p></div>
      <div className="bg-white rounded-xl border border-stone-100 p-5 mb-6 space-y-4">
        <div className="relative"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, code, or hex…" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" /></div>
        <div className="flex flex-wrap gap-4">
          <div><div className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Color</div><div className="flex gap-1.5 flex-wrap">{['', ...FAMILIES].map((f) => <button key={f||'all'} onClick={() => setFamily(f as ColorFamily|'')} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${family===f?'bg-stone-900 text-white':'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>{f||'All'}</button>)}</div></div>
          <div><div className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Finish</div><div className="flex gap-1.5 flex-wrap">{(['', ...FINISHES] as (Finish|'')[]).map((f) => <button key={f||'all'} onClick={() => setFinish(f)} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${finish===f?'bg-stone-900 text-white':'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>{f ? FINISH_LABEL[f] : 'All'}</button>)}</div></div>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex-1">
          {isLoading ? <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin text-stone-400" /></div>
          : !shades?.length ? <div className="text-center py-20 text-stone-400 text-sm">No shades found.</div>
          : <><p className="text-xs text-stone-400 mb-4">{shades.length} shades</p><div className="swatch-grid">{shades.map((shade) => <button key={shade.id} onClick={() => setSelected(shade)} className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selected?.id===shade.id?'border-stone-900 scale-105':'border-transparent hover:border-stone-300'}`} style={{ backgroundColor: shade.hex }} title={shade.name}><div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity flex items-end p-1.5"><span className="text-[10px] font-semibold truncate w-full" style={{ color: contrastColor(shade.hex) }}>{shade.code}</span></div></button>)}</div></> }
        </div>
        {selected && (
          <div className="w-64 shrink-0"><div className="bg-white rounded-xl border border-stone-100 overflow-hidden sticky top-0"><div className="h-32 w-full" style={{ backgroundColor: selected.hex }} /><div className="p-5"><div className="text-xs text-stone-400 mb-0.5">{selected.code}</div><h3 className="font-bold text-stone-900 mb-4">{selected.name}</h3><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-stone-500">Hex</span><code className="text-stone-900 font-mono text-xs">{selected.hex}</code></div><div className="flex justify-between"><span className="text-stone-500">LRV</span><span className="text-stone-900">{selected.lrv}</span></div><div className="flex justify-between"><span className="text-stone-500">Family</span><span className="text-stone-900 capitalize">{selected.colorFamily.toLowerCase()}</span></div><div><span className="text-stone-500 block mb-1.5">Finishes</span><div className="flex gap-1 flex-wrap">{selected.finishes.map((f) => <span key={f} className="px-2 py-0.5 bg-stone-100 rounded text-xs text-stone-600">{FINISH_LABEL[f]}</span>)}</div></div></div></div></div></div>
        )}
      </div>
    </div>
  );
}
