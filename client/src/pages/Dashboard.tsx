import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Sparkles, Bug, History, ArrowRight, Activity, Calendar, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { WeatherCard } from '../components/WeatherCard';
import { AdvisoryCard } from '../components/AdvisoryCard';
import { DiagnosisCard } from '../components/DiagnosisCard';
import { Modal } from '../components/Modal';
import { getHistoryApi, getWeatherApi } from '../services/api';
import { Advisory, Diagnosis, WeatherData } from '../shared/types';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected Modal items
  const [selectedAdvisory, setSelectedAdvisory] = useState<Advisory | null>(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [wRes, hRes] = await Promise.all([
          getWeatherApi(user?.location || 'Central Valley, CA'),
          getHistoryApi('all')
        ]);
        setWeather(wRes);
        setAdvisories(hRes.advisories || []);
        setDiagnoses(hRes.diagnoses || []);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-emerald-500/20 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Precision Farming Portal</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-bold border border-emerald-500/20">LIVE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {user?.name || 'Farmer'} 👋
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Farm Location: <strong className="text-white">{user?.location || 'Central Valley, CA'}</strong> | Primary Soil: <strong className="text-emerald-400">{user?.soil_type || 'Silty Loam'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            to="/advisory/new"
            className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-emerald-400 to-green-300 hover:from-emerald-300 hover:to-green-200 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Sparkles className="w-4 h-4" /> New AI Advisory
          </Link>
        </div>
      </div>

      {/* Grid Layout: Weather + Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Weather Widget */}
        <div className="lg:col-span-2">
          <WeatherCard weather={weather} loading={loading} />
        </div>

        {/* Quick Stats Column */}
        <div className="space-y-4">
          <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold">Total AI Advisories</span>
              <p className="text-2xl font-extrabold text-white">{advisories.length}</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Bug className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold">Disease Diagnoses</span>
              <p className="text-2xl font-extrabold text-white">{diagnoses.length}</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold">Healthy Field Score</span>
              <p className="text-2xl font-extrabold text-emerald-400">92.8%</p>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT CROP DISEASE DIAGNOSES */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Bug className="w-5 h-5 text-rose-400" /> Recent Crop Disease Diagnoses
            </h3>
            <p className="text-xs text-slate-400">AI visual leaf diagnoses and severity levels</p>
          </div>
          <Link to="/history" className="text-xs font-semibold text-emerald-400 hover:underline">View All History →</Link>
        </div>

        {diagnoses.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center">
            <Bug className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No crop disease diagnoses recorded yet.</p>
            <Link to="/advisory/new" className="mt-3 inline-block text-xs text-emerald-400 font-bold hover:underline">Upload Crop Photo for Instant Diagnosis →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diagnoses.slice(0, 3).map((diag) => (
              <DiagnosisCard
                key={diag.id}
                diagnosis={diag}
                onViewDetails={(item) => setSelectedDiagnosis(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* RECENT ADVISORIES */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" /> Recent AI Recommendations
            </h3>
            <p className="text-xs text-slate-400">Customized fertilizer and irrigation schedules</p>
          </div>
          <Link to="/history" className="text-xs font-semibold text-emerald-400 hover:underline">View All History →</Link>
        </div>

        {advisories.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center">
            <Sprout className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No advisories generated yet.</p>
            <Link to="/advisory/new" className="mt-3 inline-block text-xs text-emerald-400 font-bold hover:underline">Create First Crop Advisory →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisories.slice(0, 3).map((adv) => (
              <AdvisoryCard
                key={adv.id}
                advisory={adv}
                onViewDetails={(item) => setSelectedAdvisory(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* DIAGNOSIS DETAIL MODAL */}
      <Modal
        isOpen={!!selectedDiagnosis}
        onClose={() => setSelectedDiagnosis(null)}
        title={`Crop Disease Diagnosis: ${selectedDiagnosis?.disease}`}
      >
        {selectedDiagnosis && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400">Target Crop:</span>
                <h4 className="text-base font-bold text-white">{selectedDiagnosis.crop_name}</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">AI Confidence:</span>
                <p className="text-lg font-mono font-bold text-emerald-400">{selectedDiagnosis.confidence}%</p>
              </div>
            </div>

            <div>
              <h5 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Curative Recommendations</h5>
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
                <strong className="text-emerald-400 block mb-1">Fertilizer Schedule:</strong>
                <p className="text-slate-300">{selectedDiagnosis.fertilizer}</p>
              </div>
              <div>
                <strong className="text-blue-400 block mb-1">Irrigation Schedule:</strong>
                <p className="text-slate-300">{selectedDiagnosis.irrigation}</p>
              </div>
            </div>

            <div>
              <h5 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Long-Term Prevention Protocol</h5>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedDiagnosis.prevention.map((prev, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{prev}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* ADVISORY DETAIL MODAL */}
      <Modal
        isOpen={!!selectedAdvisory}
        onClose={() => setSelectedAdvisory(null)}
        title={selectedAdvisory?.title || 'Crop Advisory Details'}
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
              <h5 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Agronomist Action Steps</h5>
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
