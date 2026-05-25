'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { projectApi } from '@/lib/api';
import type { UploadedImage } from '@/types';

export default function NewProjectContent() {
  const router = useRouter();
  const [step, setStep] = useState<'upload' | 'naming'>('upload');
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [projectName, setProjectName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!uploadedImage || !projectName.trim()) return;
    setCreating(true);
    try {
      const { data } = await projectApi.create({ name: projectName.trim(), imageId: uploadedImage.id });
      router.push(`/projects/${data.id}`);
    } catch {
      setError('Failed to create project. Please try again.');
      setCreating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-1">New project</h1>
        <p className="text-stone-500 text-sm">Upload a room or exterior photo to start visualizing paint shades.</p>
      </div>
      {step === 'upload' ? (
        <div className="bg-white rounded-2xl border border-stone-100 p-8">
          <h2 className="font-semibold text-stone-900 mb-5">Upload your photo</h2>
          <ImageUpload onUploaded={(img) => { setUploadedImage(img); setStep('naming'); }} />
          <p className="text-xs text-stone-400 mt-4 text-center">JPEG, PNG, WebP · Max 10 MB · Indoor rooms or building exteriors only</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-100 p-8 space-y-6">
          <div>
            <div className="text-green-600 text-sm font-semibold mb-1">✓ Photo uploaded & classified</div>
            <p className="text-stone-500 text-sm">Type: <span className="font-medium text-stone-700">{uploadedImage?.classification}</span></p>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Project name</label>
            <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="e.g., Sharma Living Room – May 2026" className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" onKeyDown={(e) => e.key === 'Enter' && handleCreate()} />
          </div>
          {error && <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">{error}</div>}
          <div className="flex gap-3">
            <button onClick={() => setStep('upload')} className="px-4 py-2.5 rounded-lg border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-50">Re-upload</button>
            <button onClick={handleCreate} disabled={!projectName.trim() || creating} className="flex-1 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2">
              {creating && <Loader2 size={16} className="animate-spin" />}
              Create & start segmentation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
