import { Router } from 'express';
import { createDiagnosis } from '../controllers/diagnosis.controller';
import { validateRequest } from '../middleware/validate';
import { authenticateToken } from '../middleware/auth';
import { aiRateLimiter } from '../middleware/rateLimiter';
import { DiagnosisRequestSchema } from '../shared/schemas';

const router = Router();

router.post('/', authenticateToken, aiRateLimiter, validateRequest(DiagnosisRequestSchema), createDiagnosis);

export default router;
