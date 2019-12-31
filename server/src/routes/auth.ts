import { Router } from 'express';
import { signUp, signIn, profile } from '../controllers/auth.controller';
import { TokenValidation } from '../utils/verifyToken';

const router: Router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', TokenValidation, profile);

export default router;
