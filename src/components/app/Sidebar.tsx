'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FolderOpen, Palette, Settings, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FolderOpen, label: 'Projects', href: '/projects' },
  { icon: Palette, label: 'Catalog', href: '/catalog' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => { logout(); router.push('/login'); };

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-white border-r border-stone-100 flex flex-col z-40">
      <div className="h-16 flex items-center px-5 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center"><span className="text-white font-bold text-xs">H</span></div>
          <span className="font-bold text-stone-900">HueVista</span>
        </div>
      </div>
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} className={cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group', active ? 'bg-brand-50 text-brand-700' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900')}>
              <item.icon size={18} className={active ? 'text-brand-600' : 'text-stone-400 group-hover:text-stone-600'} />
              {item.label}
              {active && <ChevronRight size={14} className="ml-auto text-brand-400" />}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-stone-100 p-4">
        {user && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">{user.name[0].toUpperCase()}</div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-stone-900 truncate">{user.name}</p>
              <p className="text-xs text-stone-400 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-stone-500 hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </aside>
  );
}
