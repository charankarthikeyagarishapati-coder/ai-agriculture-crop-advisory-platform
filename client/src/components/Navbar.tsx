import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, LayoutDashboard, Sparkles, History, User as UserIcon, ShieldAlert, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 p-2 text-slate-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-full h-full stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">Agri<span className="text-emerald-400">Vision</span></span>
              <span className="ml-1.5 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">AI OS</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive('/dashboard') ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                <Link
                  to="/advisory/new"
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive('/advisory/new') ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  New AI Advisory
                </Link>

                <Link
                  to="/history"
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive('/history') ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <History className="w-4 h-4" />
                  History
                </Link>

                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      isActive('/admin') ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-400" />
                    Admin Portal
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* User Auth Profile / Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/50 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white leading-tight">{user.name}</p>
                    <p className="text-[10px] text-emerald-400 capitalize">{user.role}</p>
                  </div>
                </Link>

                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-green-300 hover:from-emerald-300 hover:to-green-200 rounded-lg shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-emerald-500/10">Dashboard</Link>
              <Link to="/advisory/new" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-emerald-400 font-semibold hover:bg-emerald-500/10">New AI Advisory</Link>
              <Link to="/history" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-emerald-500/10">History</Link>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-emerald-500/10">Profile Settings</Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-purple-400 hover:bg-purple-500/10">Admin Portal</Link>
              )}
              <button
                onClick={() => { logout(); navigate('/'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="space-y-2 pt-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-2 text-slate-200 bg-slate-800 rounded-lg">Sign In</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center py-2 text-slate-950 font-bold bg-emerald-400 rounded-lg">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
