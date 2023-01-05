import express from 'express';
import dotenv from 'dotenv';
import get from 'lodash/get';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import router from './route/index';
import { connectDatabase } from './common/connectDB';
import { mess500 } from './middleware/constants';

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello Hello Hello!!!  World!');
});

const pretty = (req, res) => {
  if (!req.response && req.response !== 0 && req.response !== false) {
    res.status(500);
    return res.send(mess500);
  }

  const message = {
    data: {},
    success: true,
    status: 400,
  };
  message.data = req.response;
  message.success = get(req.response, 'errMess') ? false : (req.success !== false);
  message.status = req.status || 200;
  return res.status(message.status).send(message);
};

app.use('/adapters', router, pretty);

app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));
connectDatabase();
