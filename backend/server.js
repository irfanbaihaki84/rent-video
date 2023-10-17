import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import videoRouter from './routes/videoRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((error) => {
    console.log(error.message);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/videos', videoRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
