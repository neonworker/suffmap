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
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => 
    console.log('db connected'));

//Middlewares
app.use(express.json());

// const user = {
//     permissions: 5,
//     locationsVisited: [],
//     friends: [],
//     _id: "5ea4847de4886b20a469df42",
//     tokens: [
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWE0ODQ3ZGU0ODg2YjIwYTQ2OWRmNDIiLCJpYXQiOjE1ODc4NDAyMjF9.CQR64xIYbdIleXT0csjigl4bNjeEER0WqYH8Bytrjms',
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWE0ODQ3ZGU0ODg2YjIwYTQ2OWRmNDIiLCJpYXQiOjE1ODc4NTc3NzR9.DqwmuwYfqLfugEYbyZX_u-TltQV3nhAGbtgX_iFRSQ4'
//     ],
//     name: 'elliot',
//     email: 'elliot@gmail.com',
//     password: '$2b$10$y0ezeS2IckgnjYx3qCBPJ.fbgsfxrQWfh6WMUnoFP9/j7MYFz/qom'
//   }

//   const edited_user = {
//     permissions: 5,
//     locationsVisited: [],
//     friends: [],
//     _id: "5ea4847de4886b20a469df42",
//     tokens: [
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWE0ODQ3ZGU0ODg2YjIwYTQ2OWRmNDIiLCJpYXQiOjE1ODc4NDAyMjF9.CQR64xIYbdIleXT0csjigl4bNjeEER0WqYH8Bytrjms',
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWE0ODQ3ZGU0ODg2YjIwYTQ2OWRmNDIiLCJpYXQiOjE1ODc4NTc3NzR9.DqwmuwYfqLfugEYbyZX_u-TltQV3nhAGbtgX_iFRSQ4'
//     ],
//     name: 'elliot',
//     email: 'elliot@gmail.com',
//     password: '$2b$10$y0ezeS2IckgnjYx3qCBPJ.fbgsfxrQWfh6WMUnoFP9/j7MYFz/qom'
//   }

// if(user._id.equals(edited_user._id)) console.log(true);





//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/content/bierdeckel', bierdeckelRoute);
app.use('/api/location/', locationRoute);
app.use('/api/user', userRoute);
app.listen(3000, () => console.log('Server running'));