const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('Database is connected');

  } catch (error) {
    console.log(`Some error was occured ${error}`);
  }
};