import { Router } from 'express';
import authRoutes from './auth.routes';
import advisoryRoutes from './advisory.routes';
import diagnosisRoutes from './diagnosis.routes';
import weatherRoutes from './weather.routes';
import historyRoutes from './history.routes';
import profileRoutes from './profile.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    service: 'AI Agriculture Crop Advisory REST API',
    status: 'online',
    health: '/api/health',
    endpoints: [
      'POST /api/auth/login',
      'POST /api/auth/register',
      'POST /api/advisory',
      'POST /api/diagnosis',
      'GET /api/weather',
      'GET /api/history',
      'GET /api/profile',
      'GET /api/admin/stats'
    ]
  });
});

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'AI Agriculture Crop Advisory API'
  });
});

router.use('/auth', authRoutes);
router.use('/advisory', advisoryRoutes);
router.use('/diagnosis', diagnosisRoutes);
router.use('/weather', weatherRoutes);
router.use('/history', historyRoutes);
router.use('/profile', profileRoutes);
router.use('/admin', adminRoutes);

export default router;
