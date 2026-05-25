import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <div className="p-6">
        <Link href="/home" className="inline-flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center"><span className="text-white font-bold text-xs">H</span></div>
          <span className="font-bold text-stone-900">HueVista</span>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12">{children}</div>
    </div>
  );
}
