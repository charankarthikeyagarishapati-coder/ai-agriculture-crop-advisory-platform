import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Bug, Upload, CheckCircle2, AlertCircle, Sprout, Droplets, ShieldCheck, FileText, ArrowRight, RefreshCw } from 'lucide-react';
import { createAdvisoryApi, createDiagnosisApi } from '../services/api';
import { Advisory, Diagnosis } from '../shared/types';

export const NewAdvisory: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'advisory'>('diagnosis');

  // Diagnosis State (Image upload)
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [diagCropName, setDiagCropName] = useState<string>('Tomato');
  const [diagSymptoms, setDiagSymptoms] = useState<string>('');
  const [diagResult, setDiagResult] = useState<Diagnosis | null>(null);

  // Advisory State (Form)
  const [advCropName, setAdvCropName] = useState<string>('Tomato');
  const [advSoilType, setAdvSoilType] = useState<string>('Loamy');
  const [advGrowthStage, setAdvGrowthStage] = useState<string>('Flowering');
  const [advIrrigation, setAdvIrrigation] = useState<string>('Drip Irrigation');
  const [advSymptoms, setAdvSymptoms] = useState<string>('Yellowing lower leaves, minor leaf curl');
  const [advNotes, setAdvNotes] = useState<string>('');
  const [advResult, setAdvResult] = useState<Advisory | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle Image Selection & Base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Image Diagnosis
  const handleDiagnosisSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      setError('Please select or upload a crop leaf image.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const result = await createDiagnosisApi({
        image: imagePreview,
        crop_name: diagCropName,
        symptoms: diagSymptoms
      });
      setDiagResult(result);
    } catch (err: any) {
      setError(err.message || 'Image diagnosis failed');
    } finally {
      setLoading(false);
    }
  };

  // Submit Smart Advisory
  const handleAdvisorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const symptomList = advSymptoms.split(',').map(s => s.trim()).filter(Boolean);
      const result = await createAdvisoryApi({
        crop_name: advCropName,
        soil_type: advSoilType,
        growth_stage: advGrowthStage,
        irrigation_method: advIrrigation,
        symptoms: symptomList,
        field_notes: advNotes
      });
      setAdvResult(result);
    } catch (err: any) {
      setError(err.message || 'Advisory generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">AI Agricultural Intelligence</span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Crop Health Analysis & Smart Advisory</h1>
        <p className="text-sm text-slate-300 mt-2">
          Upload a crop leaf photo for instant AI disease diagnosis or generate a personalized crop management advisory plan.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-slate-800 pb-2">
        <div className="glass-panel p-1.5 rounded-2xl flex gap-2">
          <button
            onClick={() => { setActiveTab('diagnosis'); setError(null); }}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'diagnosis'
                ? 'bg-gradient-to-r from-emerald-400 to-green-300 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bug className="w-4 h-4" /> 1. Crop Health Analysis (Image Upload)
          </button>
          <button
            onClick={() => { setActiveTab('advisory'); setError(null); }}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'advisory'
                ? 'bg-gradient-to-r from-emerald-400 to-green-300 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" /> 2. Smart Advisory Generator
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* TAB 1: CROP DISEASE DIAGNOSIS (IMAGE UPLOAD) */}
      {activeTab === 'diagnosis' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Upload Form */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-400" /> Upload Crop Leaf Image
            </h3>

            <form onSubmit={handleDiagnosisSubmit} className="space-y-4">
              {/* Drag and drop box */}
              <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-900/50 relative overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {imagePreview ? (
                  <div className="space-y-3">
                    <img src={imagePreview} alt="Crop Leaf Preview" className="max-h-48 mx-auto rounded-xl border border-slate-700 shadow-md object-cover" />
                    <p className="text-xs text-emerald-400 font-semibold">Image Loaded Ready for Gemini AI Analysis</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-200">Drag & drop plant leaf photo here</p>
                    <p className="text-xs text-slate-500">Supports JPG, PNG, WEBP (Max 10MB)</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Crop Type (Optional Context)</label>
                <input
                  type="text"
                  placeholder="e.g. Tomato, Wheat, Corn, Cotton"
                  value={diagCropName}
                  onChange={(e) => setDiagCropName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Observed Symptoms (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Brown spots on leaves, yellow margins"
                  value={diagSymptoms}
                  onChange={(e) => setDiagSymptoms(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-400 to-green-300 hover:from-emerald-300 hover:to-green-200 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Image with Gemini AI...
                  </>
                ) : (
                  <>
                    <Bug className="w-4 h-4" /> Run AI Disease Diagnosis
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Diagnosis Results Card */}
          <div>
            {diagResult ? (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">AI Pathologist Diagnosis</span>
                    <h3 className="text-xl font-bold text-white">{diagResult.disease}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Confidence Score</span>
                    <p className="text-2xl font-extrabold text-emerald-400">{diagResult.confidence}%</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Curative Recommendations</h4>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {diagResult.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <strong className="text-emerald-400 block mb-1 flex items-center gap-1">
                      <Sprout className="w-4 h-4" /> Fertilizer Plan:
                    </strong>
                    <p className="text-slate-300">{diagResult.fertilizer}</p>
                  </div>

                  <div>
                    <strong className="text-blue-400 block mb-1 flex items-center gap-1">
                      <Droplets className="w-4 h-4" /> Irrigation Schedule:
                    </strong>
                    <p className="text-slate-300">{diagResult.irrigation}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Long-Term Prevention</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {diagResult.prevention.map((prev, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{prev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800/80 h-full flex flex-col justify-center items-center">
                <Bug className="w-12 h-12 text-slate-600 mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Waiting for Crop Image</h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  Upload a photo of affected crop leaves on the left to receive AI diagnosis and treatment recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SMART ADVISORY GENERATOR (FORM) */}
      {activeTab === 'advisory' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Advisory Input Form */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" /> Enter Farm Parameters
            </h3>

            <form onSubmit={handleAdvisorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Crop Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tomato, Wheat, Corn, Cotton"
                  value={advCropName}
                  onChange={(e) => setAdvCropName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Soil Texture</label>
                  <select
                    value={advSoilType}
                    onChange={(e) => setAdvSoilType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Loamy">Loamy Soil</option>
                    <option value="Silty Loam">Silty Loam</option>
                    <option value="Clay Loam">Clay Loam</option>
                    <option value="Sandy">Sandy Soil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Growth Stage</label>
                  <select
                    value={advGrowthStage}
                    onChange={(e) => setAdvGrowthStage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Seedling">Seedling / Germination</option>
                    <option value="Vegetative">Vegetative Stage</option>
                    <option value="Flowering">Flowering / Booting</option>
                    <option value="Fruiting">Fruiting / Grain Fill</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Irrigation System</label>
                <select
                  value={advIrrigation}
                  onChange={(e) => setAdvIrrigation(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Drip Irrigation">Drip Irrigation</option>
                  <option value="Center Pivot Sprinkler">Center Pivot Sprinkler</option>
                  <option value="Sub-surface Drip">Sub-surface Drip</option>
                  <option value="Flood / Furrow">Flood / Furrow</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Observed Symptoms (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="Yellow leaves, leaf curl, stunted growth"
                  value={advSymptoms}
                  onChange={(e) => setAdvSymptoms(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-400 to-green-300 hover:from-emerald-300 hover:to-green-200 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                {loading ? 'Generating Smart Advisory...' : 'Generate AI Advisory Plan'}
              </button>
            </form>
          </div>

          {/* Advisory Result */}
          <div>
            {advResult ? (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">AI Advisory Protocol</span>
                  <h3 className="text-xl font-bold text-white mt-1">{advResult.title}</h3>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Agronomic Recommendations</h4>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {advResult.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <strong className="text-emerald-400 block mb-1">Target N-P-K Fertilizer:</strong>
                    <p className="text-slate-300">{advResult.fertilizer}</p>
                  </div>
                  <div>
                    <strong className="text-blue-400 block mb-1">Irrigation Frequency:</strong>
                    <p className="text-slate-300">{advResult.irrigation}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800/80 h-full flex flex-col justify-center items-center">
                <Sparkles className="w-12 h-12 text-slate-600 mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Waiting for Farm Parameters</h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  Fill in your crop, soil type, and irrigation details to generate a customized AI advisory plan.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
