'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2, AlertCircle } from 'lucide-react';
import { imageApi } from '@/lib/api';
import type { UploadedImage } from '@/types';
import { cn } from '@/lib/utils';

interface Props { onUploaded: (image: UploadedImage) => void; }

const ACCEPTED = { 'image/jpeg': [], 'image/png': [], 'image/webp': [] };
const MAX_SIZE = 10 * 1024 * 1024;

export default function ImageUpload({ onUploaded }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback(async (accepted: File[]) => {
    const file = accepted[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { data } = await imageApi.upload(file);
      if (data.classification === 'INVALID') {
        setError('This photo was rejected. Please upload an indoor room or building exterior.');
      } else {
        onUploaded(data as UploadedImage);
      }
    } catch {
      setError('Upload failed. Please check your connection and try again.');
    } finally {
      setUploading(false);
    }
  }, [onUploaded]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({ onDrop, accept: ACCEPTED, maxSize: MAX_SIZE, maxFiles: 1, disabled: uploading });
  const rejected = fileRejections[0]?.errors[0];

  return (
    <div>
      <div {...getRootProps()} className={cn('relative border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all', isDragActive ? 'border-brand-400 bg-brand-50' : 'border-stone-200 hover:border-stone-300 bg-stone-50', uploading && 'pointer-events-none opacity-70')}>
        <input {...getInputProps()} />
        {uploading ? (
          <><Loader2 size={32} className="text-brand-600 animate-spin mb-4" /><p className="text-stone-600 font-medium">Uploading & classifying…</p></>
        ) : (
          <><div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center mb-4"><Upload size={24} className="text-brand-600" /></div><p className="font-semibold text-stone-800 mb-1">{isDragActive ? 'Drop to upload' : 'Drag & drop your photo'}</p><p className="text-stone-400 text-sm">or click to browse</p></>
        )}
      </div>
      {(error || rejected) && (
        <div className="mt-3 flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {error || (rejected?.code === 'file-too-large' ? 'File exceeds 10 MB limit.' : 'Only JPEG, PNG, and WebP files are accepted.')}
        </div>
      )}
    </div>
  );
}
