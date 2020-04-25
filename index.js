const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/authentication/auth');
const bierdeckelRoute = require('./routes/content/bierdeckel');

dotenv.config();

//das ist ein test
//noch ein test

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => 
    console.log('db connected'));

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/content/bierdeckel', bierdeckelRoute);

app.listen(3000, () => console.log('Server running'));