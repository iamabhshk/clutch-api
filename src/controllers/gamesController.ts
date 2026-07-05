import type { Request, Response } from 'express';
import prisma from '../lib/prisma'; // Using your updated prisma path

export const games = async (req: Request, res: Response) => {
    try{
        const games = await prisma.game.findMany();
        res.status(200).json(games);
    }catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getGameBySlug = async (req: Request, res: Response) => {
    try{
        const { slug } = req.params;
        const game = await prisma.game.findUnique({
            where: { slug },
            include: {
                posts: {
                    include: {
                        author: {
                            include: { profile: true }
                        }
                    }
                }
            }
        });
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.status(200).json(game);
    } catch (error) {
        console.error('Error fetching game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};