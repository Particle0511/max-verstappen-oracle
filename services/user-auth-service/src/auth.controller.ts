import { Router, Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await registerUser(email, password);
    res.status(201).json(user);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (error) {
    const err = error as Error;
    res.status(401).json({ message: err.message });
  }
});

export default router;