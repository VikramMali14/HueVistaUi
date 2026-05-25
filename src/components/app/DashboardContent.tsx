'use client';

import Link from 'next/link';
import { Plus, FolderOpen, Palette, Zap, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProjects } from '@/hooks/useProject';
import ProjectCard from './ProjectCard';

export default function DashboardContent() {
  const { user } = useAuth();
  const { data: projects, isLoading } = useProjects();
  const recentProjects = projects?.slice(0, 4) ?? [];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Good day{user ? `, ${user.name.split(' ')[0]}` : ''}</h1>
          <p className="text-stone-500 text-sm mt-0.5">Here’s what’s happening with your projects.</p>
        </div>
        <Link href="/projects/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
          <Plus size={16} /> New project
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: FolderOpen, label: 'Total projects', value: projects?.length ?? 0, color: 'text-brand-600 bg-brand-50' },
          { icon: Palette, label: 'Colors applied', value: '—', color: 'text-violet-600 bg-violet-50' },
          { icon: Zap, label: 'AI generations', value: '—', color: 'text-paint-600 bg-paint-50' },
          { icon: TrendingUp, label: 'Customers served', value: '—', color: 'text-green-600 bg-green-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-stone-100 p-5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}><stat.icon size={18} /></div>
            <div className="text-2xl font-bold text-stone-900 mb-0.5">{stat.value}</div>
            <div className="text-xs text-stone-500">{stat.label}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-stone-900">Recent projects</h2>
          <Link href="/projects" className="text-sm text-brand-600 hover:underline">View all</Link>
        </div>
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-4">{[1,2,3,4].map((i) => <div key={i} className="h-40 bg-stone-100 rounded-xl animate-pulse" />)}</div>
        ) : recentProjects.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-stone-200 p-12 text-center">
            <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4"><FolderOpen size={22} className="text-brand-600" /></div>
            <h3 className="font-semibold text-stone-900 mb-1">No projects yet</h3>
            <p className="text-stone-500 text-sm mb-6">Upload a room photo to create your first paint visualization.</p>
            <Link href="/projects/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors"><Plus size={16} /> Create project</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">{recentProjects.map((p) => <ProjectCard key={p.id} project={p} />)}</div>
        )}
      </div>
    </div>
  );
}
