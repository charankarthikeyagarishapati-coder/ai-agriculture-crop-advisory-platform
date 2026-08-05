import { Router } from 'express';
import { createAdvisory } from '../controllers/advisory.controller';
import { validateRequest } from '../middleware/validate';
import { authenticateToken } from '../middleware/auth';
import { aiRateLimiter } from '../middleware/rateLimiter';
import { AdvisoryRequestSchema } from '../shared/schemas';

const router = Router();

router.post('/', authenticateToken, aiRateLimiter, validateRequest(AdvisoryRequestSchema), createAdvisory);

export default router;
