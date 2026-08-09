import Link from 'next/link';
import { Shield, Lock, Cpu, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-white text-lg">Parakh AI</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Parakh AI is the digital trust layer for the internet — verifying not only whether content is AI-generated, but whether its claims, context, source, and origin can actually be trusted.
            </p>
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Responsible AI Compliant • Probabilistic Evidence-Based Reasoning
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Web Verifier</Link></li>
              <li><Link href="/investigate/INV-2026-VIRAL-DEMO" className="hover:text-white transition-colors">Killer Demo Scenario</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Investigation History</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">System Metrics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Architecture</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-blue-400" /> ViT AI Image Classifier</li>
              <li className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-indigo-400" /> Error Level Analysis (ELA)</li>
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Open-Source Local NLP Claim Engine</li>
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-amber-400" /> Multi-Axis Trust Engine</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 Parakh AI. Before you believe it, verify it.</p>
          <p className="mt-2 sm:mt-0 font-mono">Core USP: We don't just detect deepfakes. We verify digital reality.</p>
        </div>
      </div>
    </footer>
  );
}
