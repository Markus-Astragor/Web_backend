const mongoose = require('mongoose');
require('dotenv').config();
const start = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("Database is connected");
    }).catch(err => {
      console.log(err, 'Some error')
    })
  }



module.exports = { start };