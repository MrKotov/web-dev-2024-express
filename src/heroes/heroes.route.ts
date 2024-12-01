import express, { Request, Response } from 'express';
import { db } from '../database';
import { Hero } from '../heroes/Hero';

const router = express.Router();

// Add a new hero
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, magicPoints, killedMonsters } = req.body;

    const hero = await db.models.Hero.create({
      name,
      magicPoints,
      killedMonsters,
    });

    res.status(201).json(hero);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get heroes by magic points
router.get('/magic-points/:magicPoints', async (req: Request, res: Response) => {
  try {
    const magicPoints = parseInt(req.params.magicPoints, 10);
    const heroes = await db.models.Hero.findAll({ where: { magicPoints } });

    res.status(200).json(heroes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Edit a hero by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const heroId = parseInt(req.params.id, 10);
    const { name, magicPoints, killedMonsters } = req.body;

    const hero = await db.models.Hero.findByPk(heroId);
    if (!hero) {
      res.status(404).json({ error: 'Hero not found' });
      return;
    }

    await hero.update({ name, magicPoints, killedMonsters });
    res.status(200).json(hero);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a hero by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const heroId = parseInt(req.params.id, 10);

    const hero = await db.models.Hero.findByPk(heroId);
    if (!hero) {
      res.status(404).json({ error: 'Hero not found' });
      return;
    }

    await hero.destroy();
    res.status(200).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
