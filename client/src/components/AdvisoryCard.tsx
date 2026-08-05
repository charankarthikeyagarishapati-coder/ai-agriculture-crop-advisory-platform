import React from 'react';
import { Sparkles, Sprout, Droplet, ShieldAlert, ArrowRight } from 'lucide-react';
import { Advisory } from '../shared/types';

interface AdvisoryCardProps {
  advisory: Advisory;
  onViewDetails?: (advisory: Advisory) => void;
}

export const AdvisoryCard: React.FC<AdvisoryCardProps> = ({ advisory, onViewDetails }) => {
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Severe':
      case 'High':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">High Risk</span>;
      case 'Medium':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">Medium Alert</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Optimal Health</span>;
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AI Crop Advisory</span>
              <h4 className="font-bold text-base text-white">{advisory.crop_name}</h4>
            </div>
          </div>
          {getRiskBadge(advisory.risk_level)}
        </div>

        <h5 className="font-semibold text-sm text-slate-200 mb-3 line-clamp-1">{advisory.title}</h5>

        {/* Advisory Highlights */}
        <div className="space-y-2 mb-4 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-start gap-2">
            <Sprout className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-slate-300 line-clamp-2"><strong className="text-white">Fertilizer:</strong> {advisory.fertilizer}</span>
          </div>
          <div className="flex items-start gap-2">
            <Droplet className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span className="text-slate-300 line-clamp-2"><strong className="text-white">Irrigation:</strong> {advisory.irrigation}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
        <span className="text-[11px] text-slate-500">
          {new Date(advisory.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(advisory)}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            Full Recommendations <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
