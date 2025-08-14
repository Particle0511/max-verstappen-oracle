import express, { Request, Response } from 'express';
import authController from './auth.controller';

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({ status: 'User Auth Service is running' });
});

app.use('/auth', authController);

app.listen(PORT, () => {
  console.log(`User Auth Service listening on port ${PORT}`);
});