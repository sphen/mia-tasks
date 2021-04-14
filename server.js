const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// set path of env file
dotenv.config({ path: './.env' });

// connect to database
connectDB();

// create app variable
const app = express();

// body parser middleware
app.use(express.json());

// // use morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// routes
app.use('/api/todos', require('./routes/todoroutes'));
app.use('/api/users', require('./routes/userroutes'));
app.use('/api/auth', require('./routes/authroutes'));
app.use((req, res, next) => {
  const render = res.render;
  const send = res.send;
  res.render = function renderWrapper(...args) {
    Error.captureStackTrace(this);
    return render.apply(this, args);
  };
  res.send = function sendWrapper(...args) {
    try {
      send.apply(this, args);
    } catch (err) {
      console.error(
        `Error in res.send | ${err.code} | ${err.message} | ${res.stack}`
      );
    }
  };
  next();
});

//  serve static in production\
if (process.env.NODE_ENV === 'production') {
  // set static path
  app.use(express.static('client/build'));
  // get static on any route besides api routes
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// set port with fallback
const PORT = process.env.PORT || 1337;

// run app
app.listen(
  PORT,
  console.log(`running on ${PORT} in ${process.env.NODE_ENV} mode`.magenta.bold)
);
