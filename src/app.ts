import express from 'express';
import heroesRouter from './heroes/heroes.route';
import { db } from './database';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/heroes', heroesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
