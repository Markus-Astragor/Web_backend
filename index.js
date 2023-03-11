const express = require('express');
require('dotenv').config();
const app = express()
const Port = process.env.PORT;
const Mongo_Db_URL = process.env.MONGO_DB_URL; 
const Mongo = require('./Setup/Mongoose'); 
const bodyParser = require('body-parser');
const Users = require('./Api_Routes/Users_api');



const setupServer = async () => {
    app.use(bodyParser.json());
    await Mongo.start(Mongo_Db_URL);
    app.get('/', (req, res)=>{
        res.send('Hi, Ostap')
    })
    
    app.use(Users.router)
    app.listen(Port, () => {
        console.log('Server was started on', Port);
    })
}

setupServer();
