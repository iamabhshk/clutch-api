import { Router } from 'express';
import { getPosts, createPost } from '../controllers/postsController';
import { authMiddleware } from '../middleware/authMiddleware';
const router = Router();

router.get('/', getPosts);
router.post('/', authMiddleware, createPost);

export default router;