import { Router } from 'express';
import { register, login, me } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate';
import { authenticateToken } from '../middleware/auth';
import { AuthRegisterSchema, AuthLoginSchema } from '../shared/schemas';

const router = Router();

router.post('/register', validateRequest(AuthRegisterSchema), register);
router.post('/login', validateRequest(AuthLoginSchema), login);
router.get('/me', authenticateToken, me);

export default router;
