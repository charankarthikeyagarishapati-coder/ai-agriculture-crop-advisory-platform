import { Request, Response } from 'express';
import { fetchLiveWeatherData } from '../services/weather';

export async function getWeather(req: Request, res: Response) {
  try {
    const location = (req.query.location as string) || 'Central Valley, CA';
    const lat = req.query.lat ? parseFloat(req.query.lat as string) : undefined;
    const lon = req.query.lon ? parseFloat(req.query.lon as string) : undefined;

    const weatherData = await fetchLiveWeatherData(location, lat, lon);
    return res.json(weatherData);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to fetch weather data' });
  }
}
