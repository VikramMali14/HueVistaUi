'use client';

import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useProjects } from '@/hooks/useProject';
import ProjectCard from './ProjectCard';

export default function ProjectsContent() {
  const { data: projects, isLoading } = useProjects();
  const [search, setSearch] = useState('');
  const filtered = projects?.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())) ?? [];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Projects</h1>
        <Link href="/projects/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-semibold transition-colors"><Plus size={16} /> New project</Link>
      </div>
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects…" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
      </div>
      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-4">{[1,2,3,4,5,6].map((i) => <div key={i} className="h-28 bg-stone-100 rounded-xl animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-stone-400">{search ? 'No projects match your search.' : 'No projects yet. Create your first one!'}</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">{filtered.map((p) => <ProjectCard key={p.id} project={p} />)}</div>
      )}
    </div>
  );
}
