import express from 'express';
import { config } from "dotenv"
import cors from 'cors';
// import multer from 'multer';

config()

import Route from './routes/index'
import connect from './configs/db'

const app = express();

// MIDDLE WARES
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json());
// app.use(multer().array())
app.use('/api/v1/', Route)
app.get('/', (req, res) => res.status(200).send("Welcome to Insta Feeds"))
app.get('*', (req, res) => res.status(404).send("Page not found"))

// app.listen(5000, (req, res) => {console.log("listening on ", 5000)})
export const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`REST API on http://localhost:${process.env.PORT}/`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();

export default app;