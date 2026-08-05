import React, { useState } from 'react';
import { User as UserIcon, Save, MapPin, Sprout, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updateProfileApi } from '../services/api';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [location, setLocation] = useState(user?.location || 'Central Valley, CA');
  const [farmSize, setFarmSize] = useState<number>(user?.farm_size_acres || 45.5);
  const [soilType, setSoilType] = useState(user?.soil_type || 'Silty Loam');
  const [phone, setPhone] = useState(user?.phone || '+1 555-0199');

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);

    try {
      await updateProfileApi({
        name,
        location,
        farm_size_acres: farmSize,
        soil_type: soilType,
        phone
      });
      setSuccessMsg('Profile settings saved successfully!');
    } catch (err: any) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        
        <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 font-extrabold text-2xl flex items-center justify-center border border-emerald-500/30">
            {name.charAt(0) || 'F'}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">{name}</h1>
            <p className="text-xs text-slate-400">Account Role: <span className="text-emerald-400 capitalize font-bold">{user?.role}</span> | Email: {user?.email}</p>
          </div>
        </div>

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Farmer Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Farm Location / Region</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Contact</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Total Farm Acreage</label>
              <input
                type="number"
                step="0.5"
                value={farmSize}
                onChange={(e) => setFarmSize(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Default Soil Type</label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2.5 text-sm text-white"
              >
                <option value="Loamy">Loamy Soil</option>
                <option value="Silty Loam">Silty Loam</option>
                <option value="Clay Loam">Clay Loam</option>
                <option value="Sandy">Sandy Soil</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-400 to-green-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm mt-4"
          >
            <Save className="w-4 h-4" /> {saving ? 'Saving Profile...' : 'Save Profile Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};
