import Link from 'next/link';
import Image from 'next/image';
import { Clock, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import type { Project } from '@/types';
import { formatDate } from '@/lib/utils';

const STATUS_ICON = {
  CREATED: <Clock size={14} className="text-stone-400" />,
  SEGMENTING: <Loader2 size={14} className="text-brand-500 animate-spin" />,
  READY: <CheckCircle size={14} className="text-green-500" />,
  ERROR: <AlertCircle size={14} className="text-red-500" />,
};

const STATUS_LABEL = { CREATED: 'Pending', SEGMENTING: 'Processing…', READY: 'Ready', ERROR: 'Error' };

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="group bg-white rounded-xl border border-stone-100 hover:border-stone-200 hover:shadow-md transition-all overflow-hidden flex gap-4 p-4">
      <div className="w-24 h-20 rounded-lg bg-stone-100 shrink-0 overflow-hidden relative">
        {project.image?.cdnUrl ? (
          <Image src={project.image.cdnUrl} alt={project.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-stone-900 text-sm truncate group-hover:text-brand-700 transition-colors">{project.name}</h3>
          <span className="flex items-center gap-1 text-xs text-stone-500 shrink-0">{STATUS_ICON[project.status]}{STATUS_LABEL[project.status]}</span>
        </div>
        <p className="text-xs text-stone-400 mb-3">{formatDate(project.updatedAt)}</p>
        {project.regions.length > 0 && (
          <div className="flex gap-1.5">
            {project.regions.filter((r) => r.colorHex).slice(0, 6).map((r) => (
              <div key={r.id} className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: r.colorHex! }} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
