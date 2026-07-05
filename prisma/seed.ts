import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const games = [
    { name: 'Valorant', slug: 'valorant', genre: 'FPS', description: 'Tactical 5v5 shooter by Riot Games.' },
    { name: 'Minecraft', slug: 'minecraft', genre: 'Sandbox', description: 'Build and survive in a blocky world.' },
    { name: 'Elden Ring', slug: 'elden-ring', genre: 'RPG', description: 'Open world action RPG by FromSoftware.' },
    { name: 'Fortnite', slug: 'fortnite', genre: 'Battle Royale', description: 'Build and battle in the last man standing.' },
    { name: 'Apex Legends', slug: 'apex-legends', genre: 'FPS', description: 'Fast-paced battle royale by Respawn.' },
  ];

  for (const game of games) {
    await prisma.game.upsert({
      where: { slug: game.slug },
      update: {},
      create: game,
    });
  }

  console.log('Games seeded.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());