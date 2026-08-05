import React from 'react';
import { ShieldCheck, Bug, Droplet, Sprout, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Diagnosis } from '../shared/types';

interface DiagnosisCardProps {
  diagnosis: Diagnosis;
  onViewDetails?: (diagnosis: Diagnosis) => void;
}

export const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ diagnosis, onViewDetails }) => {
  const getSeverityBadge = (severity?: string) => {
    switch (severity) {
      case 'Severe':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">Severe Outbreak</span>;
      case 'Moderate':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Moderate Risk</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Mild / Managed</span>;
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center">
              <Bug className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Crop Health Analysis</span>
              <h4 className="font-bold text-base text-white">{diagnosis.crop_name || 'Crop'} Diagnosis</h4>
            </div>
          </div>
          {getSeverityBadge(diagnosis.severity)}
        </div>

        <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 mb-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-rose-300">{diagnosis.disease}</span>
            <span className="font-mono text-emerald-400 font-bold">{diagnosis.confidence}% confidence</span>
          </div>
          {/* Confidence Meter Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500"
              style={{ width: `${diagnosis.confidence}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Treatment & Fertilizer Snippet */}
        <div className="space-y-2 mb-4 text-xs">
          <div className="flex items-start gap-2 text-slate-300">
            <Sprout className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Fertilizer: </span>
              <span className="text-slate-400">{diagnosis.fertilizer}</span>
            </div>
          </div>
          <div className="flex items-start gap-2 text-slate-300">
            <Droplet className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Irrigation: </span>
              <span className="text-slate-400">{diagnosis.irrigation}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
        <span className="text-[11px] text-slate-500">
          {new Date(diagnosis.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(diagnosis)}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            View Full Protocol →
          </button>
        )}
      </div>
    </div>
  );
};
