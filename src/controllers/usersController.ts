import type { Request, Response } from 'express';
import prisma from '../lib/prisma'; 

export const getUserByUsername = async (req: Request, res: Response) => {
    try{
        const { username } = req.params;
        console.log('Fetching user with username:', username);
        const profile = await prisma.profile.findUnique({
            where: { gamertag: username },
            select: {
                gamertag: true,
                bio: true,
                avatarUrl: true,
                createdAt: true,
                user: {
                    select: {
                        posts: {
                            orderBy: { createdAt: 'desc' },
                            select: {
                                id: true,
                                title: true,
                                type: true,
                                createdAt: true,
                                game: { select: { name: true, slug: true } }
                            }
                        }
                    }
                }
            }
        });
        if (!profile) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};