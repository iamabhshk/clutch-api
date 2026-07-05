import { Router } from 'express';
import { games, getGameBySlug } from '../controllers/gamesController';

const router = Router();

router.get('/', games);
router.get('/:slug', getGameBySlug);


export default router;