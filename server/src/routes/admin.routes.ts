import { Router } from 'express';
import { getAdminStats } from '../controllers/admin.controller';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

router.get('/stats', authenticateToken, requireRole(['admin']), getAdminStats);

export default router;
