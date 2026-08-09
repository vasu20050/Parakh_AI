'use client';

import Link from 'next/link';
import { ShieldCheck, Cpu, Search, FileText, Lock, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/75 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              Parakh AI <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-normal">v1.0 MVP</span>
            </span>
            <span className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Digital Trust Platform</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-blue-400" />
            Investigate
          </Link>

          <Link
            href="/investigate/INV-2026-VIRAL-DEMO"
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors flex items-center gap-2"
          >
            <Cpu className="w-4 h-4 text-indigo-400" />
            Killer Demo Report
          </Link>

          <Link
            href="/dashboard"
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            Dashboard
          </Link>

          <Link
            href="/admin"
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            Admin Stats
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all flex items-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            Sign In
          </Link>
        </div>

      </div>
    </header>
  );
}
