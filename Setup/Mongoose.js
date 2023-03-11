const mongoose = require('mongoose');
require('dotenv').config();


const start = async (URL) => {
  await mongoose.connect(URL).then(() => {
    console.log("Database is connected");
  }).catch(err => {
    console.log(err, 'Some error')
  })
}



module.exports = { start };