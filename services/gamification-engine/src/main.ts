import express, { Request, Response } from 'express';
import gameController from './game.controller';

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({ status: 'Gamification Engine is running' });
});

app.use('/game', gameController);

app.listen(PORT, () => {
  console.log(`Gamification Engine listening on port ${PORT}`);
});
