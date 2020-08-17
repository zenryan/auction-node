// @ts-ignore
import createError = require('http-errors')
import express = require('express')
import { join } from 'path'
// @ts-ignore
import cookieParser = require('cookie-parser')
// @ts-ignore
import logger = require('morgan')
// @ts-ignore
import Magic = require('express-routemagic')
import "reflect-metadata";
import { createConnection } from "typeorm";
import cors from 'cors';
// @ts-ignore
import config = require('./config');

const app: express.Application = express();

// connecting to database
createConnection(config.database).then(connection => {
  console.log(`Connected to DB ${config.database.host}:${config.database.port}`);
}).catch(error => {
  console.log(`Error connecting to DB ${config.database.host}:${config.database.port}`);
  console.log(error)
  process.exit(1);
});

// view engine setup
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(join(__dirname, 'public')))

const corsOptions = cors({
  credentials: true,
  origin: true,
  methods: ['GET, HEAD, PUT, PATCH, POST, DELETE'],
  maxAge: 31536000000000,
  preflightContinue: true,
});

// enable cors
app.use(corsOptions);

// route magic (autoload)
Magic.use(app, { invokerPath: __dirname, logMapping: config.debug });

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(createError(404))
});

// error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

module.exports = app;
