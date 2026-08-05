import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, Search, Filter, Bug, Sparkles, FileText } from 'lucide-react';
import { getHistoryApi } from '../services/api';
import { Advisory, Diagnosis } from '../shared/types';
import { AdvisoryCard } from '../components/AdvisoryCard';
import { DiagnosisCard } from '../components/DiagnosisCard';
import { Modal } from '../components/Modal';

export const History: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected Modal items
  const [selectedAdvisory, setSelectedAdvisory] = useState<Advisory | null>(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);

  useEffect(() => {
    async function loadHistory() {
      setLoading(true);
      try {
        const res = await getHistoryApi(filterType, searchQuery);
        setAdvisories(res.advisories || []);
        setDiagnoses(res.diagnoses || []);
      } catch (err) {
        console.error('Error fetching history:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, [filterType, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Filters */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Field Repository</span>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <HistoryIcon className="w-7 h-7 text-emerald-400" /> Advisory & Health History
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review past AI crop diagnoses, fertilizer schedules, and disease logs.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by crop or disease..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${filterType === 'all' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'}`}
            >
              All Logs
            </button>
            <button
              onClick={() => setFilterType('diagnosis')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${filterType === 'diagnosis' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400'}`}
            >
              Diagnoses
            </button>
            <button
              onClick={() => setFilterType('advisory')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${filterType === 'advisory' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'}`}
            >
              Advisories
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-400">Loading history records...</div>
      ) : advisories.length === 0 && diagnoses.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center">
          <HistoryIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Records Found</h3>
          <p className="text-xs text-slate-400">Try adjusting your search criteria or create a new advisory.</p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Diagnoses Section */}
          {(filterType === 'all' || filterType === 'diagnosis') && diagnoses.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Bug className="w-5 h-5 text-rose-400" /> Crop Disease Diagnoses ({diagnoses.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diagnoses.map((diag) => (
                  <DiagnosisCard
                    key={diag.id}
                    diagnosis={diag}
                    onViewDetails={(item) => setSelectedDiagnosis(item)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Advisories Section */}
          {(filterType === 'all' || filterType === 'advisory') && advisories.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" /> Smart Advisory Records ({advisories.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advisories.map((adv) => (
                  <AdvisoryCard
                    key={adv.id}
                    advisory={adv}
                    onViewDetails={(item) => setSelectedAdvisory(item)}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* DIAGNOSIS MODAL */}
      <Modal
        isOpen={!!selectedDiagnosis}
        onClose={() => setSelectedDiagnosis(null)}
        title={`Disease Diagnosis: ${selectedDiagnosis?.disease}`}
      >
        {selectedDiagnosis && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400">Target Crop:</span>
                <h4 className="text-base font-bold text-white">{selectedDiagnosis.crop_name}</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Confidence Score:</span>
                <p className="text-lg font-mono font-bold text-emerald-400">{selectedDiagnosis.confidence}%</p>
              </div>
            </div>

            <div>
              <h5 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Curative Steps</h5>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {selectedDiagnosis.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div>
                <strong className="text-emerald-400 block mb-1">Fertilizer:</strong>
                <p className="text-slate-300">{selectedDiagnosis.fertilizer}</p>
              </div>
              <div>
                <strong className="text-blue-400 block mb-1">Irrigation:</strong>
                <p className="text-slate-300">{selectedDiagnosis.irrigation}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ADVISORY MODAL */}
      <Modal
        isOpen={!!selectedAdvisory}
        onClose={() => setSelectedAdvisory(null)}
        title={selectedAdvisory?.title || 'Advisory Details'}
      >
        {selectedAdvisory && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400">Crop</span>
                <p className="font-bold text-white">{selectedAdvisory.crop_name}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Soil</span>
                <p className="font-bold text-emerald-400">{selectedAdvisory.soil_type}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Stage</span>
                <p className="font-bold text-white">{selectedAdvisory.growth_stage}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Risk Level</span>
                <p className="font-bold text-amber-400">{selectedAdvisory.risk_level}</p>
              </div>
            </div>

            <div>
              <h5 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Recommendations</h5>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {selectedAdvisory.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div>
                <strong className="text-emerald-400 block mb-1">Target N-P-K Fertilizer:</strong>
                <p className="text-slate-300">{selectedAdvisory.fertilizer}</p>
              </div>
              <div>
                <strong className="text-blue-400 block mb-1">Irrigation Schedule:</strong>
                <p className="text-slate-300">{selectedAdvisory.irrigation}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
