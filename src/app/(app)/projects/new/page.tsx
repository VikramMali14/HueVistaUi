import type { Metadata } from 'next';
import NewProjectContent from '@/components/app/NewProjectContent';

export const metadata: Metadata = { title: 'New Project' };

export default function NewProjectPage() { return <NewProjectContent />; }
