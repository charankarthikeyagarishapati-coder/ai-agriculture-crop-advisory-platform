import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../shared/types';
import { getMeApi, loginApi, registerApi } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  quickDemoLogin: (role: 'farmer' | 'admin') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('agri_jwt_token'));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadSession() {
      if (token) {
        try {
          const res = await getMeApi();
          setUser(res.user);
        } catch (err) {
          console.warn('Session expired or invalid, logging out:', err);
          logout();
        }
      }
      setLoading(false);
    }
    loadSession();
  }, [token]);

  const login = async (email: string, pass: string) => {
    const res = await loginApi(email, pass);
    localStorage.setItem('agri_jwt_token', res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const register = async (data: any) => {
    const res = await registerApi(data);
    localStorage.setItem('agri_jwt_token', res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('agri_jwt_token');
    setToken(null);
    setUser(null);
  };

  const quickDemoLogin = async (role: 'farmer' | 'admin') => {
    const email = role === 'admin' ? 'admin@agri.ai' : 'farmer@agri.ai';
    await login(email, 'password123');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, quickDemoLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
