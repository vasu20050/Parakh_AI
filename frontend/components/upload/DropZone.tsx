'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileImage, Film, FileText, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DropZoneProps {
  onFileSelect?: (file: File) => void;
}

export default function DropZone({ onFileSelect }: DropZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];

    // File validation
    const maxSizeBytes = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSizeBytes) {
      setError('File size exceeds 100MB threshold.');
      return;
    }

    setError(null);
    setSelectedFile(file);

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setIsUploading(true);

    // Simulate backend upload dispatch & investigation creation
    setTimeout(() => {
      setIsUploading(false);
      // Navigate to investigation report page
      router.push('/investigate/INV-2026-VIRAL-DEMO');
    }, 1200);
  };

  const getFileIcon = () => {
    if (!selectedFile) return <UploadCloud className="w-12 h-12 text-blue-400 mb-3" />;
    if (selectedFile.type.startsWith('image/')) return <FileImage className="w-10 h-10 text-blue-400" />;
    if (selectedFile.type.startsWith('video/')) return <Film className="w-10 h-10 text-purple-400" />;
    return <FileText className="w-10 h-10 text-emerald-400" />;
  };

  return (
    <div className="w-full space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
          dragActive
            ? 'border-blue-500 bg-blue-500/10 scale-[1.01]'
            : selectedFile
            ? 'border-emerald-500/50 bg-emerald-500/5'
            : 'border-slate-700/70 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,audio/*,.pdf,.txt"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          {getFileIcon()}

          {selectedFile ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                <span>{selectedFile.name}</span>
              </div>
              <p className="text-xs text-slate-400">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'Unknown type'}
              </p>
              {previewUrl && (
                <div className="mt-3 relative w-32 h-32 mx-auto rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          ) : (
            <>
              <h3 className="text-lg font-bold text-white mb-1">
                Drag & Drop Media or File
              </h3>
              <p className="text-sm text-slate-400 max-w-sm mb-4">
                Supports Images (JPG, PNG, WebP), Videos (MP4, MOV), Audio, or Documents up to 100MB
              </p>
              <div className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700">
                Browse Local Files
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {selectedFile && (
        <button
          onClick={handleSubmit}
          disabled={isUploading}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Orchestrating Forensic Pipeline...</span>
            </>
          ) : (
            <>
              <span>Run TrustGraph Deep Investigation</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
