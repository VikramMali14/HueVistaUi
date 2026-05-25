import type { Metadata } from 'next';
import Pricing from '@/components/marketing/Pricing';

export const metadata: Metadata = { title: 'Pricing' };

export default function PricingPage() {
  return <div className="pt-20"><Pricing /></div>;
}
