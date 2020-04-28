const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/authentication/auth');
const bierdeckelRoute = require('./routes/bierdeckel');
const locationRoute = require('./routes/location');
const userRoute = require('./routes/user')

dotenv.config();

//Connect to DB
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => 
    console.log('db connected'));

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/content/bierdeckel', bierdeckelRoute);
app.use('/api/location/', locationRoute);
app.use('/api/user', userRoute);

app.listen(3000, () => console.log('Server running'));