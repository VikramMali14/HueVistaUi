import type { Metadata } from 'next';
import CatalogContent from '@/components/app/CatalogContent';

export const metadata: Metadata = { title: 'Shade Catalog' };

export default function CatalogPage() { return <CatalogContent />; }
