import React, { useState, useEffect } from 'react';
import { ShieldAlert, Users, Sparkles, Bug, Activity, Server, Database } from 'lucide-react';
import { getAdminStatsApi } from '../services/api';
import { AdminStats } from '../shared/types';

export const Admin: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAdminData() {
      try {
        const data = await getAdminStatsApi();
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Failed to access admin portal. Requires admin role.');
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-slate-400">Loading admin analytics portal...</div>;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <div className="glass-panel p-8 rounded-3xl border border-rose-500/30">
          <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">Access Restricted</h3>
          <p className="text-xs text-slate-400 mb-4">{error}</p>
          <p className="text-[11px] text-slate-500">Log in with the Demo Admin account (admin@agri.ai) to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-bold text-purple-400 tracking-wider">System Administration</span>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2 mt-1">
            <ShieldAlert className="w-7 h-7 text-purple-400" /> Platform Admin Portal
          </h1>
          <p className="text-xs text-slate-400">Platform operational metrics, disease outbreak telemetry, and user management.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
          <Server className="w-3.5 h-3.5 text-purple-400" /> Gemini API & Supabase Active
        </div>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-purple-400">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{stats?.total_users || 0}</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-emerald-400">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total AI Advisories</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{stats?.total_advisories || 0}</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-rose-400">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Disease Diagnoses</span>
            <Bug className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{stats?.total_diagnoses || 0}</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-blue-400">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>System Health</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400">100%</p>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Top Diagnosed Diseases */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Bug className="w-4.5 h-4.5 text-rose-400" /> Top Diagnosed Plant Pathogens
          </h3>
          <div className="space-y-3">
            {stats?.top_diagnosed_diseases.map((item, idx) => (
              <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{item.disease}</span>
                <span className="font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {item.count} cases
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* User Role Distribution */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4.5 h-4.5 text-purple-400" /> User Demographic Distribution
          </h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Farmers</span>
              <p className="text-xl font-bold text-emerald-400 mt-1">{stats?.users_by_role.farmer || 0}</p>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Agronomists</span>
              <p className="text-xl font-bold text-blue-400 mt-1">{stats?.users_by_role.agronomist || 0}</p>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Admins</span>
              <p className="text-xl font-bold text-purple-400 mt-1">{stats?.users_by_role.admin || 0}</p>
            </div>
          </div>
        </div>

      </div>

      {/* System Activity Logs */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-4.5 h-4.5 text-blue-400" /> Recent System Audit Logs
        </h3>
        <div className="divide-y divide-slate-800 text-xs">
          {stats?.recent_system_activities.map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-semibold text-slate-200">{log.action}</span>
                <span className="text-slate-500">by {log.user_email}</span>
              </div>
              <span className="text-slate-500 font-mono">
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
