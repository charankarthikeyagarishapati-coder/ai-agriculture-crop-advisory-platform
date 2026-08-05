import { Router } from 'express';
import { getHistory } from '../controllers/history.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getHistory);

export default router;
