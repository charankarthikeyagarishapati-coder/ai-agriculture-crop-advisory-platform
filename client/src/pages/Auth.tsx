import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, LogIn, UserPlus, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthProps {
  initialMode?: 'login' | 'signup';
}

export const Auth: React.FC<AuthProps> = ({ initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const { login, register, quickDemoLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'farmer' | 'agronomist' | 'admin'>('farmer');
  const [location, setLocation] = useState('Central Valley, CA');
  const [soilType, setSoilType] = useState('Loamy');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register({ email, password, name, role, location, soil_type: soilType });
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async (targetRole: 'farmer' | 'admin') => {
    setLoading(true);
    setError(null);
    try {
      await quickDemoLogin(targetRole);
      navigate(targetRole === 'admin' ? '/admin' : '/dashboard');
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="glass-panel p-8 rounded-3xl border border-emerald-500/20 shadow-2xl relative overflow-hidden">
        
        {/* Top Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {isLogin ? 'Welcome Back to AgriVision' : 'Create Your Farmer Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isLogin ? 'Access your field advisories & crop health history' : 'Join thousands of precision farmers optimizing crop yields'}
          </p>
        </div>

        {/* Quick Demo Shortcuts Banner */}
        <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 mb-6 text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-2">⚡ Instant One-Click Demo Access</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemo('farmer')}
              disabled={loading}
              className="px-3 py-2 text-xs font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <Sprout className="w-3.5 h-3.5" /> Demo Farmer
            </button>
            <button
              type="button"
              onClick={() => handleDemo('admin')}
              disabled={loading}
              className="px-3 py-2 text-xs font-bold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Demo Admin
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="John Farmer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="farmer@agri.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {!isLogin && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Account Role</label>
                <select
                  value={role}
                  onChange={(e: any) => setRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="farmer">Farmer</option>
                  <option value="agronomist">Agronomist</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Soil Type</label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Loamy">Loamy Soil</option>
                  <option value="Silty Loam">Silty Loam</option>
                  <option value="Clay Loam">Clay Loam</option>
                  <option value="Sandy">Sandy Soil</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-400 to-green-300 hover:from-emerald-300 hover:to-green-200 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm mt-2"
          >
            {loading ? 'Authenticating...' : isLogin ? 'Sign In to Portal' : 'Register Farmer Account'}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="mt-6 text-center border-t border-slate-800 pt-4">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up here" : 'Already have an account? Sign in here'}
          </button>
        </div>
      </div>
    </div>
  );
};
