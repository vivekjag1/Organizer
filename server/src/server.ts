import express, {Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import exampleRoute from './routes/exampleRoute.ts';
dotenv.config();
const app:Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/organizer';
console.log(uri);
(async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database Connected. Fire away!");

  } catch (error) {
    console.error(error);
  }
})();

app.get('/health', (_req : Request, res:Response) => {
  res.status(200).send('server is running!');
});

app.use('/api/example', exampleRoute);

const PORT: string|number = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

