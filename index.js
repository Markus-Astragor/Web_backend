//Підключення бібліотек
const express = require('express');
const Mongo = require('./Setup/Mongoose');
const bodyParser = require('body-parser');
const Theatre = require('./Api_routes/Theatre.js');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());



const Setup_server = async () => {
  await Mongo.start(process.env.MONGO_DB_URL)

  app.use(Theatre.router);

  app.listen(process.env.PORT, (req, res) => {
    console.log(`Server started on ${process.env.PORT}`)
  })
}

Setup_server()