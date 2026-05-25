'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Loader2 } from 'lucide-react';
import { shadeApi } from '@/lib/api';
import { useUpdateRegionColor } from '@/hooks/useProject';
import { contrastColor } from '@/lib/utils';
import type { Shade, ColorFamily } from '@/types';

const COLOR_FAMILIES: ColorFamily[] = ['RED','ORANGE','YELLOW','GREEN','BLUE','PURPLE','PINK','BROWN','GREY','WHITE'];
const FAMILY_HEX: Record<ColorFamily, string> = { RED:'#ef4444',ORANGE:'#f97316',YELLOW:'#eab308',GREEN:'#22c55e',BLUE:'#3b82f6',PURPLE:'#a855f7',PINK:'#ec4899',BROWN:'#92400e',GREY:'#6b7280',WHITE:'#f5f5f4',BLACK:'#111827' };

interface Props { projectId: string; activeRegionId: string | null; disabled: boolean; }

export default function ShadePanel({ projectId, activeRegionId, disabled }: Props) {
  const [search, setSearch] = useState('');
  const [family, setFamily] = useState<ColorFamily | ''>('');
  const { mutate: updateColor } = useUpdateRegionColor();

  const { data: shades, isLoading } = useQuery<Shade[]>({
    queryKey: ['shades', search, family],
    queryFn: async () => { const { data } = await shadeApi.list({ search: search || undefined, colorFamily: family || undefined, size: 60 }); return data.content ?? data; },
    staleTime: 60_000,
  });

  return (
    <div className="h-full bg-white rounded-2xl border border-stone-100 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-stone-100">
        <h2 className="font-semibold text-stone-900 text-sm mb-3">Paint catalog</h2>
        <div className="relative mb-3"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search shades…" className="w-full pl-8 pr-3 py-2 rounded-lg border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
        <div className="flex gap-1.5 flex-wrap">
          <button onClick={() => setFamily('')} className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${family === '' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>All</button>
          {COLOR_FAMILIES.map((f) => <button key={f} onClick={() => setFamily(f === family ? '' : f)} className={`w-5 h-5 rounded-full border-2 transition-all ${f === family ? 'border-stone-900 scale-110' : 'border-transparent'}`} style={{ backgroundColor: FAMILY_HEX[f] }} title={f} />)}
        </div>
      </div>
      {disabled && <div className="px-4 py-3 bg-stone-50 border-b border-stone-100 text-xs text-stone-500">Run surface detection first, then select a region to apply colors.</div>}
      {!disabled && !activeRegionId && <div className="px-4 py-3 bg-brand-50 border-b border-brand-100 text-xs text-brand-700">Click a region on the canvas, then tap a shade to apply.</div>}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? <div className="flex justify-center py-8"><Loader2 size={20} className="animate-spin text-stone-400" /></div>
        : !shades?.length ? <p className="text-center text-stone-400 text-xs py-8">No shades found</p>
        : <div className="swatch-grid">{shades.map((shade) => <button key={shade.id} onClick={() => { if (!activeRegionId || disabled) return; updateColor({ projectId, regionId: activeRegionId, hex: shade.hex }); }} disabled={disabled || !activeRegionId} title={`${shade.name} · ${shade.code}`} className="group relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-stone-900 disabled:cursor-not-allowed transition-all" style={{ backgroundColor: shade.hex }}><div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity flex items-end p-1"><span className="text-[9px] font-bold leading-tight truncate w-full" style={{ color: contrastColor(shade.hex) }}>{shade.code}</span></div></button>)}</div>}
      </div>
    </div>
  );
}
