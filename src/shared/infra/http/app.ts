import express from 'express';
import { v1Router } from './api/v1';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import config from 'config';

const origin = {
  // origin: isProduction ? 'https://dddforum.com' : '*',
  origin: '*'
};

const app = express();
const port: number = config.get('app.port');
const mongoUri: string = config.get('mongo.uri');

mongoose.connect(mongoUri).then(r => {
  console.log('connected Mongo!');
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));

app.use(v1Router);

app.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`);
});