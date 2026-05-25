import type { Metadata } from 'next';
import SettingsContent from '@/components/app/SettingsContent';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage() { return <SettingsContent />; }
