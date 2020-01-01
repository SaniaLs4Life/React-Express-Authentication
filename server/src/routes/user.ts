import { Router } from 'express';
import { getUsers } from './../controllers/user.controller';
import { TokenValidation } from '../utils/verifyToken';

const router: Router = Router();
router.get('/users', getUsers);

export default router;
