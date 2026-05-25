import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'HueVista — Paint Visualizer for Retailers', template: '%s | HueVista' },
  description:
    'AI-powered paint shade visualizer for the Indian paint retail market. Show customers exactly how any color looks on their walls before painting.',
  keywords: ['paint visualizer', 'wall color preview', 'Asian Paints', 'Berger', 'Nerolac', 'paint retailer'],
  openGraph: {
    title: 'HueVista — Paint Visualizer',
    description: 'See your walls in any color before you paint a single stroke.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
