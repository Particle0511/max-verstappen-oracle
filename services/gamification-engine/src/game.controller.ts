import { Router, Request, Response } from 'express';
import { createPrediction, getLeaderboard } from './game.service';

const router = Router();

router.get('/leaderboard', async (req: Request, res: Response) => {
  try {
    const leaderboard = await getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
});

router.post('/predict', async (req: Request, res: Response) => {
  try {
    const { userId, predictionType, value } = req.body;
    if (!userId || !predictionType || value === undefined) {
      return res.status(400).json({ message: 'userId, predictionType, and value are required' });
    }
    const prediction = await createPrediction({ userId, predictionType, value });
    res.status(201).json(prediction);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
});

export default router;