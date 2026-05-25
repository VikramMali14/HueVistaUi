'use client';

import { cn } from '@/lib/utils';
import type { Region, SegmentationType } from '@/types';

interface Props { regions: Region[]; activeRegionId: string | null; onSelect: (id: string | null) => void; }

const REGION_LABELS: Record<SegmentationType, string> = { MAIN_WALL: 'Main wall', ACCENT_WALL: 'Accent wall', TRIM: 'Trim / frames', MANUAL: 'Custom' };

export default function RegionSelector({ regions, activeRegionId, onSelect }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {regions.map((r) => (
        <button key={r.id} onClick={() => onSelect(r.id === activeRegionId ? null : r.id)} className={cn('flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all', r.id === activeRegionId ? 'bg-brand-600 text-white shadow-md' : 'bg-white/90 backdrop-blur text-stone-700 hover:bg-white')}>
          {r.colorHex && <span className="w-3 h-3 rounded-full border border-white/50" style={{ backgroundColor: r.colorHex }} />}
          {REGION_LABELS[r.type]}
        </button>
      ))}
    </div>
  );
}
