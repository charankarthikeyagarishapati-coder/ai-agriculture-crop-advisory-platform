import { User, Advisory, Diagnosis, WeatherData, AdminStats } from '../shared/types';

const API_BASE = '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('agri_jwt_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function loginApi(email: string, password: string): Promise<{ token: string; user: User }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
}

export async function registerApi(userData: any): Promise<{ token: string; user: User }> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data;
}

export async function getMeApi(): Promise<{ user: User }> {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch user session');
  return data;
}

export async function createAdvisoryApi(payload: any): Promise<Advisory> {
  const res = await fetch(`${API_BASE}/advisory`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Advisory generation failed');
  return data;
}

export async function createDiagnosisApi(payload: { image: string; crop_name?: string; symptoms?: string; location?: string }): Promise<Diagnosis> {
  const res = await fetch(`${API_BASE}/diagnosis`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Crop health diagnosis failed');
  return data;
}

export async function getHistoryApi(type: string = 'all', search: string = ''): Promise<{ advisories: Advisory[]; diagnoses: Diagnosis[] }> {
  const params = new URLSearchParams({ type, search });
  const res = await fetch(`${API_BASE}/history?${params.toString()}`, {
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch history');
  return data;
}

export async function getWeatherApi(location?: string, lat?: number, lon?: number): Promise<WeatherData> {
  const params = new URLSearchParams();
  if (location) params.append('location', location);
  if (lat) params.append('lat', lat.toString());
  if (lon) params.append('lon', lon.toString());

  const res = await fetch(`${API_BASE}/weather?${params.toString()}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch weather');
  return data;
}

export async function updateProfileApi(profileData: Partial<User>): Promise<{ message: string; user: User }> {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(profileData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Profile update failed');
  return data;
}

export async function getAdminStatsApi(): Promise<AdminStats> {
  const res = await fetch(`${API_BASE}/admin/stats`, {
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch admin stats');
  return data;
}
