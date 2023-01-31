// proper goo search for dotenv shit: npmjs package dotenv
// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// import * as dotenv from 'dotenv';
// dotenv.config();
import 'dotenv/config'
// console.log(process.env)
// if( process.env.NODE_ENV !== 'production') {
//   require('dotenv').parse();
//     console.log(process.env.NODE_ENV) // <-- undefined.
// }

import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// routes
import indexRouter from './routes/index.js';
import quoteRouter from './routes/quoteroutes.js';

// https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// initialize express app
const app = express(process.env.DATABASE_URL);
console.log(process.env.DATABASE_URL);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layouts');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// console.log('env db url: ', `${process.env.DATABASE_URL}`);
// set up db connection
mongoose.set('strictQuery', true); // some flag deprication bullshit
mongoose.connect(`${process.env.DATABASE_URL}`, { useNewUrlParser: true });

// check our db connect; log an error or success
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connected to db'));

//routes
app.use('/', indexRouter);
app.use('/quotes', quoteRouter);


app.listen(process.env.PORT || 3002, () => console.log('Server Started'));
