import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validate';
import { ProfileUpdateSchema } from '../shared/schemas';

const router = Router();

router.get('/', authenticateToken, getProfile);
router.put('/', authenticateToken, validateRequest(ProfileUpdateSchema), updateProfile);

export default router;
