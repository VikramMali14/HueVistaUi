import Link from 'next/link';

const links = {
  Product: [
    { label: 'Features', href: '/home#features' },
    { label: 'How it works', href: '/home#how-it-works' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: 'mailto:hello@huevista.com' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-white font-bold text-lg">HueVista</span>
            </div>
            <p className="text-sm leading-relaxed">AI-powered paint shade visualizer for the Indian paint retail market.</p>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="text-white font-semibold text-sm mb-4">{category}</div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm hover:text-white transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <span>© {new Date().getFullYear()} HueVista. All rights reserved.</span>
          <span>Made with ♥ for the Indian paint industry</span>
        </div>
      </div>
    </footer>
  );
}
