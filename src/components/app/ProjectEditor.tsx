'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Share2, Download, Loader2, Wand2, RefreshCw } from 'lucide-react';
import { useProject, useProjectStatus, useSegmentProject } from '@/hooks/useProject';
import ShadePanel from './ShadePanel';
import RegionSelector from './RegionSelector';

export default function ProjectEditor({ projectId }: { projectId: string }) {
  const { data: project, isLoading } = useProject(projectId);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const { mutate: segment, isPending: segmenting } = useSegmentProject();
  const isSegmenting = project?.status === 'SEGMENTING';

  useProjectStatus(projectId, isSegmenting);

  if (isLoading) return <div className="flex items-center justify-center h-96"><Loader2 size={32} className="animate-spin text-brand-600" /></div>;
  if (!project) return <div className="text-center py-20 text-stone-500">Project not found.</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-stone-900">{project.name}</h1>
          <p className="text-stone-400 text-xs mt-0.5 uppercase tracking-wide">{project.status}</p>
        </div>
        <div className="flex items-center gap-3">
          {project.status === 'CREATED' && (
            <button onClick={() => segment({ id: projectId })} disabled={segmenting} className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-semibold disabled:opacity-60">
              {segmenting ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />} Detect surfaces
            </button>
          )}
          {project.status === 'READY' && (
            <>
              <button onClick={() => segment({ id: projectId })} className="inline-flex items-center gap-2 px-3 py-2 border border-stone-200 text-stone-600 rounded-lg text-sm hover:bg-stone-50"><RefreshCw size={14} /> Re-segment</button>
              <button className="inline-flex items-center gap-2 px-3 py-2 border border-stone-200 text-stone-600 rounded-lg text-sm hover:bg-stone-50"><Share2 size={14} /> Share</button>
              <button className="inline-flex items-center gap-2 px-3 py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700"><Download size={14} /> Export PNG</button>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-6 h-[calc(100vh-200px)]">
        <div className="flex-1 bg-stone-900 rounded-2xl overflow-hidden relative flex items-center justify-center">
          {isSegmenting && <div className="absolute inset-0 bg-stone-900/80 flex flex-col items-center justify-center z-10"><Loader2 size={36} className="animate-spin text-brand-400 mb-4" /><p className="text-white font-medium">Detecting surfaces…</p><p className="text-stone-400 text-sm mt-1">This takes 5–15 seconds</p></div>}
          {project.image?.cdnUrl && (
            <div className="relative w-full h-full">
              <Image src={project.image.cdnUrl} alt={project.name} fill className="object-contain" priority />
              {project.status === 'READY' && project.regions.map((region) => (
                <div key={region.id} onClick={() => setActiveRegion(region.id === activeRegion ? null : region.id)} className={`absolute inset-0 cursor-pointer transition-opacity ${region.id === activeRegion ? 'opacity-100' : 'opacity-0 hover:opacity-30'}`} style={region.colorHex ? { backgroundColor: region.colorHex, mixBlendMode: 'multiply' } : {}} />
              ))}
            </div>
          )}
          {project.status === 'READY' && <div className="absolute bottom-4 left-4"><RegionSelector regions={project.regions} activeRegionId={activeRegion} onSelect={setActiveRegion} /></div>}
        </div>
        <div className="w-72 shrink-0"><ShadePanel projectId={projectId} activeRegionId={activeRegion} disabled={project.status !== 'READY'} /></div>
      </div>
    </div>
  );
}
