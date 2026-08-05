import React from 'react';
import { CloudSun, Thermometer, Droplets, Wind, Umbrella, Sparkles, Sun } from 'lucide-react';
import { WeatherData } from '../shared/types';

interface WeatherCardProps {
  weather: WeatherData | null;
  loading?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather, loading }) => {
  if (loading || !weather) {
    return (
      <div className="glass-panel p-6 rounded-2xl animate-pulse space-y-4">
        <div className="h-6 bg-slate-800 rounded w-1/3"></div>
        <div className="h-10 bg-slate-800 rounded w-1/2"></div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-12 bg-slate-800 rounded"></div>
          <div className="h-12 bg-slate-800 rounded"></div>
          <div className="h-12 bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
      {/* Subtle ambient blur */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Live Agricultural Weather</span>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            {weather.location}
          </h3>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
          <CloudSun className="w-7 h-7" />
        </div>
      </div>

      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-4xl font-extrabold text-white tracking-tight">{weather.temperature}°C</span>
        <span className="text-sm font-semibold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          {weather.condition}
        </span>
      </div>

      {/* Weather Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            Humidity
          </div>
          <span className="font-bold text-sm text-white">{weather.humidity}%</span>
        </div>

        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Wind className="w-3.5 h-3.5 text-emerald-400" />
            Wind Speed
          </div>
          <span className="font-bold text-sm text-white">{weather.wind_speed} km/h</span>
        </div>

        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Umbrella className="w-3.5 h-3.5 text-cyan-400" />
            Rain Risk
          </div>
          <span className="font-bold text-sm text-white">{weather.precipitation_probability}%</span>
        </div>

        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            Evapotranspiration
          </div>
          <span className="font-bold text-sm text-white">{weather.evapotranspiration_mm} mm/day</span>
        </div>
      </div>

      {/* 5-Day Micro Forecast */}
      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">5-Day Farming Forecast</h4>
        <div className="grid grid-cols-5 gap-1.5 text-center">
          {weather.forecast.map((day, i) => (
            <div key={i} className="bg-slate-900/40 p-2 rounded-lg border border-slate-800/60">
              <p className="text-[10px] text-slate-400 truncate">{day.date.split('-').slice(-2).join('/') || day.date}</p>
              <p className="text-xs font-bold text-white my-0.5">{day.temp_max}°</p>
              <span className={`text-[9px] px-1 py-0.5 rounded font-semibold ${day.rain_probability > 40 ? 'bg-cyan-500/20 text-cyan-300' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {day.rain_probability}% 🌧
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
