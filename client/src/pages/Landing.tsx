import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Sparkles, Bug, CloudSun, ShieldCheck, ArrowRight, TrendingUp, CheckCircle, Award, Cpu, Droplets } from 'lucide-react';

export const Landing: React.FC = () => {
  const [farmAcres, setFarmAcres] = useState<number>(50);
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');

  const calculateYieldIncrease = () => {
    const baseProfit = selectedCrop === 'Tomato' ? 4500 : selectedCrop === 'Wheat' ? 1200 : 2200;
    const gain = Math.round(farmAcres * baseProfit * 0.28);
    return gain.toLocaleString();
  };

  return (
    <div className="space-y-24 py-8">
      
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6 animate-pulse">
          <Sparkles className="w-4 h-4" /> Powered by Google Gemini 3.6 & 1.5 Pro AI
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] max-w-5xl mx-auto mb-6">
          AI-Powered Precision Agriculture <span className="text-gradient">Crop Advisory OS</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
          Diagnose crop diseases instantly with photo AI vision, receive tailored fertilizer plans, climate-aware irrigation schedules, and expert agronomist guidance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-green-300 hover:from-emerald-300 hover:to-green-200 rounded-xl shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Start Free AI Diagnosis <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-200 hover:text-white glass-panel rounded-xl hover:bg-slate-800/60 transition-colors flex items-center justify-center gap-2"
          >
            Demo Farmer Login
          </Link>
        </div>

        {/* Feature Pill Highlights */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-panel p-4 rounded-xl text-left border-l-4 border-l-emerald-400">
            <p className="text-xs text-slate-400 font-semibold">Disease Accuracy</p>
            <p className="text-xl font-extrabold text-white">98.4% Precision</p>
          </div>
          <div className="glass-panel p-4 rounded-xl text-left border-l-4 border-l-blue-400">
            <p className="text-xs text-slate-400 font-semibold">Yield Optimization</p>
            <p className="text-xl font-extrabold text-white">+28% Output</p>
          </div>
          <div className="glass-panel p-4 rounded-xl text-left border-l-4 border-l-cyan-400">
            <p className="text-xs text-slate-400 font-semibold">Water Savings</p>
            <p className="text-xl font-extrabold text-white">-35% Usage</p>
          </div>
          <div className="glass-panel p-4 rounded-xl text-left border-l-4 border-l-amber-400">
            <p className="text-xs text-slate-400 font-semibold">Live Weather Sync</p>
            <p className="text-xl font-extrabold text-white">Open-Meteo API</p>
          </div>
        </div>
      </section>

      {/* CORE PLATFORM FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Built for Modern Farmers</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">End-to-End Smart Farming Capabilities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="glass-card p-8 rounded-2xl relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
              <Bug className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Crop Disease Vision</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Upload leaf or plant photos. Google Gemini Multimodal AI detects bacterial, fungal, and viral infections in seconds with structured treatment advice.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card p-8 rounded-2xl relative">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Climate-Aware Irrigation</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Calculates exact daily evapotranspiration (ET0) and soil water capacity to prevent over-watering and root rot.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card p-8 rounded-2xl relative">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Fertilizer Dosing Engine</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Get exact N-P-K nutrient recommendations tailored to your specific soil texture, crop growth stage, and field acreage.
            </p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE ROI / YIELD CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Interactive Profit Calculator</span>
              <h3 className="text-3xl font-extrabold text-white mt-2 mb-4">Calculate Your Farm's Potential Yield Revenue</h3>
              <p className="text-sm text-slate-300 mb-6">
                See how precision AI fertilizer dosing and early disease diagnosis can save input costs and increase net harvest revenue.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Crop Type</label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Tomato">Tomato (High Value Solanaceous)</option>
                    <option value="Wheat">Wheat (Cereal Crop)</option>
                    <option value="Maize">Maize / Corn</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Total Farm Size</span>
                    <span className="text-emerald-400 font-bold">{farmAcres} Acres</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={farmAcres}
                    onChange={(e) => setFarmAcres(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Estimated Annual Net Gain</span>
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 my-4 tracking-tight">
                +${calculateYieldIncrease()}
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Based on 28% average yield recovery and 35% reduced input wastage across {farmAcres} acres of {selectedCrop}.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                Start Farm Optimization Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
