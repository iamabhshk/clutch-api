import type { Request, Response } from 'express';
import prisma from '../lib/prisma'; // Using your updated prisma path
import type { AuthRequest } from '../middleware/authMiddleware';

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                body: true,
                type: true,
                isSpoiler: true,
                createdAt: true,
                game: { select: { name: true, slug: true } },
                author: { select: { id: true, profile: { select: { gamertag: true } } } }
            }
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createPost = async (req: AuthRequest, res: Response) => {
    try {
        const authorId = req.user?.id;
        if (!authorId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const { title, body, gameId, type } = req.body;
        if (!title || !body || !gameId || !type) {
            res.status(400).json({ error: 'Title, body, gameId and type are required' });
            return;
        }
        const post = await prisma.post.create({
            data: {
                title,
                body,
                gameId,
                type,
                authorId
            }
        });
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}