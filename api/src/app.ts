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

const app: express.Application = express();

// TOOD: Use config and exit app when not connected to db 
createConnection({
    type: "mysql",
    host: "localhost",
    port: 33061,
    username: "root",
    password: "root",
    database: "koi",
    "entities": [
        "src/entity/**/*.ts"
     ],
     "migrations": [
        "src/migration/**/*.ts"
     ],
     "subscribers": [
        "src/subscriber/**/*.ts"
     ],
    synchronize: false,
    logging: false
}).then(connection => {
    console.log('Connected to DB');
}).catch(error => console.log(error));

// view engine setup
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(join(__dirname, 'public')))

Magic.use(app, { invokerPath: __dirname, logMapping: true });

// enable cors
app.use(cors({
    credentials: true,
    origin: true,
    methods: ['GET, HEAD, PUT, PATCH, POST, DELETE'],
    maxAge: 31536000000000,
    preflightContinue: true
}))

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404))
})

// error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app