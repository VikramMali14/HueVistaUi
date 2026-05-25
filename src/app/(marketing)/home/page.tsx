import type { Metadata } from 'next';
import Hero from '@/components/marketing/Hero';
import Features from '@/components/marketing/Features';
import HowItWorks from '@/components/marketing/HowItWorks';
import Pricing from '@/components/marketing/Pricing';

export const metadata: Metadata = { title: 'HueVista — Paint Visualizer for Retailers' };

export default function HomePage() {
  return (<><Hero /><HowItWorks /><Features /><Pricing /></>);
}
