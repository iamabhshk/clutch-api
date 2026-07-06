import { Router } from 'express';
import { getPosts, createPost, getPostById } from '../controllers/postsController';
import { authMiddleware } from '../middleware/authMiddleware';
const router = Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, createPost);


export default router;