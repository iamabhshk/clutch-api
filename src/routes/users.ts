import { Router } from 'express';
import { getUserByUsername } from '../controllers/usersController';

const router = Router();

router.get('/:username', getUserByUsername);

export default router;