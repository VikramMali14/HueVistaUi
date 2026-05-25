'use client';

import { useAuth } from '@/hooks/useAuth';

export default function SettingsContent() {
  const { user } = useAuth();
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-stone-900 mb-8">Settings</h1>
      <div className="bg-white rounded-xl border border-stone-100 p-6 mb-6">
        <h2 className="font-semibold text-stone-900 mb-5">Profile</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xl font-bold">{user?.name?.[0]?.toUpperCase() ?? '?'}</div>
          <div><p className="font-semibold text-stone-900">{user?.name}</p><p className="text-stone-500 text-sm">{user?.email}</p></div>
        </div>
        <div className="grid gap-4">
          {[{ label: 'Full name', value: user?.name, placeholder: 'Your name' }, { label: 'Email', value: user?.email, placeholder: 'your@email.com' }].map((field) => (
            <div key={field.label}><label className="block text-sm font-medium text-stone-700 mb-1.5">{field.label}</label><input defaultValue={field.value ?? ''} placeholder={field.placeholder} className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" /></div>
          ))}
          <button className="self-start px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-semibold transition-colors">Save changes</button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-stone-100 p-6">
        <div className="flex items-center justify-between mb-5"><h2 className="font-semibold text-stone-900">Subscription</h2><span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-700">Professional</span></div>
        <div className="space-y-4">
          <div><div className="flex justify-between text-sm mb-2"><span className="text-stone-600">AI generations used</span><span className="font-medium text-stone-900">24 / 60</span></div><div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden"><div className="h-full bg-brand-500 rounded-full" style={{ width: '40%' }} /></div></div>
          <p className="text-xs text-stone-400">Resets on June 1, 2026</p>
          <a href="/pricing" className="inline-block text-sm text-brand-600 hover:underline font-medium">Upgrade plan →</a>
        </div>
      </div>
    </div>
  );
}
