const express = require('express');
require('dotenv').config();
const app = express()
const Port = process.env.PORT; 



app.get('/', (req, res)=>{
    res.send('Hi, Ostap')
})


app.listen(Port, () => {
    console.log('Server was started on', Port);
})