//Підключення бібліотек
const express = require('express');
const Mongo = require('./Setup/Mongoose');
const bodyParser = require('body-parser');
const Theatre = require('./Api_routes/Theatre.api.js');
const Sessions = require('./Api_routes/Sessions.api');
const { default: mongoose } = require('mongoose');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());



const Setup_server = async () => {
  await Mongo.start(process.env.MONGO_DB_URL);

  app.use(Theatre.router);
  app.use(Sessions.router);

  app.listen(process.env.PORT, (req, res) => {
    console.log(`Server started on ${process.env.PORT}`)
  })
}

Setup_server()