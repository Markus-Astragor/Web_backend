const express = require('express');
const mongoose = require('mongoose');

const start =async ()=>{
await mongoose.connect('mongodb+srv://Astragor:z1x2c3v4b5@sandbox.5pnjbg4.mongodb.net/test').then(()=>{
  console.log("Database is connected");
}).catch(err => {
  console.log(err, 'Some error')
})
}

const app = express();


start();
app.get('/', (req, res) => {
  res.status(200).send('Hello, world');
})


app.listen(3004, (req, res)=>{
  console.log('Server started')
})