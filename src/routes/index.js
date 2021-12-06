import express from 'express';
import UserRouter from './userRoute/index'
import FeedRouter from './feeds/index'

import { rateLimiterMiddleware } from '../middlewares/requestLimit'

const Router = express.Router();

Router.use('/user', UserRouter);
Router.use('/feeds', FeedRouter);

export default Router;