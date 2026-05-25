import type { Metadata } from 'next';
import ProjectEditor from '@/components/app/ProjectEditor';

export const metadata: Metadata = { title: 'Project Editor' };

export default function ProjectEditorPage({ params }: { params: { id: string } }) {
  return <ProjectEditor projectId={params.id} />;
}
