const express = require('express');
const MongoDb = require('./Setup/Mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
//.env
const mongoDbUrl = process.env.MONGO_DB_URL;
const port = process.env.PORT;

const Sales = require('./Api/getSales');

const setupServer = async () => {
  await MongoDb.start(mongoDbUrl);

  app.use(Sales.router);
  
  app.listen(port, (req, res) => {
      console.log(`Server was started on ${port}`);
  })
}

setupServer();