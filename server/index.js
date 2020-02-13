import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import jwt from 'koa-jwt';
import logger from 'koa-logger';
import passport from 'koa-passport';
import mongoose from 'mongoose';
import helmet from 'koa-helmet';
import routing from './routes';
import { port, connexionString } from './config';
const session = require('koa-session');
const redisStore = require('koa-redis')
const cors = require('@koa/cors');

mongoose.connect(connexionString, { useNewUrlParser: true });
mongoose.connection.on('error', console.error);

// Create Koa Application
const app = new Koa();

app
  .use(logger())
  .use(bodyParser())
  .use(helmet())
  .use(cors())

routing(app);


require('./config/passport')
app
  .use(passport.initialize())
  .use(passport.session())


// Start the application
app.listen(port, () =>
  console.log(`✅  The server is running at http://localhost:${port}/`)
);
export default app;
