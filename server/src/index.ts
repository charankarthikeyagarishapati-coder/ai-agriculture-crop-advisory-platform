import express from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import apiRoutes from './routes';
import { apiRateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Global Middlewares
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Root welcome handler
app.get('/', (req, res) => {
  res.json({
    message: '🌱 AI Agriculture Crop Advisory Server is Running!',
    api: `http://localhost:${ENV.PORT}/api`,
    frontend: 'http://localhost:3000'
  });
});

app.use('/api', apiRateLimiter);

// Register API Routes
app.use('/api', apiRoutes);

// Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(ENV.PORT, () => {
  console.log(`===================================================`);
  console.log(`🌱 AI Agriculture Crop Advisory Server Running!`);
  console.log(`📡 URL: http://localhost:${ENV.PORT}/api`);
  console.log(`🤖 Gemini API Key configured: ${ENV.GEMINI_API_KEY ? 'YES' : 'NO (Using Rule-based AI generator)'}`);
  console.log(`===================================================`);
});

export default app;
