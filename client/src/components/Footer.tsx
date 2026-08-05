import React from 'react';
import { Sprout, Heart, Shield, Cpu, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1 */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-white">Agri<span className="text-emerald-400">Vision</span> AI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            AI-powered precision agriculture operating system helping farmers optimize crop yields, diagnose plant diseases, and automate smart irrigation.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400/80 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/40 w-max">
            <Cpu className="w-3.5 h-3.5" /> Powered by Google Gemini 3.6 & 1.5 Pro
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Core Platform</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="/advisory/new" className="hover:text-emerald-400 transition-colors">Crop Disease Diagnosis</a></li>
            <li><a href="/advisory/new" className="hover:text-emerald-400 transition-colors">Fertilizer Calculator</a></li>
            <li><a href="/dashboard" className="hover:text-emerald-400 transition-colors">Smart Irrigation Schedule</a></li>
            <li><a href="/history" className="hover:text-emerald-400 transition-colors">Field History & Logs</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Security & Compliance</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400" /> Supabase Row Level Security</li>
            <li>Zod Schema Validated APIs</li>
            <li>JWT Multi-Role Authentication</li>
            <li>Encrypted Server-Side AI Inference</li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Hackathon Context</h4>
          <p className="text-xs text-slate-400 mb-2">
            Built for Google Antigravity Ideate Hackathon 2026. Production-grade full-stack engineering standards.
          </p>
          <div className="text-xs text-slate-500">
            © 2026 AgriVision AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
