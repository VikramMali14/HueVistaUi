import QueryProvider from '@/components/providers/QueryProvider';
import Sidebar from '@/components/app/Sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="flex min-h-screen bg-stone-50">
        <Sidebar />
        <div className="flex-1 ml-60 min-h-screen"><main className="p-8">{children}</main></div>
      </div>
    </QueryProvider>
  );
}
