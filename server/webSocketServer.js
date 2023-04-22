//import libraries
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const path = require('path');
//import files
const setTelegramWebHook = require('./telegramBot');
const setupWebSocket = require('./webSocket');
const MongoDB = require('../Setup/Mongoose');
const {Message} = require('./models/Message');

const PORT = process.env.PORT;

//import Models


const app = express();
setupWebSocket();
const emitter = new events.EventEmitter();

app.use(cors());
app.use(bodyParser.json());
setTelegramWebHook(app, emitter);
app.use(express.static(path.join(__dirname, '../public/build')));


const setup = async() => {
 await MongoDB.start(process.env.MONGO_DB_URL);



app.get('/login', (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send({
      message: 'parameter id is required'
    });
  }
  const eventName = `login-${id}`;
  console.log(`Wait on login id: ${id}`);
  emitter.once(eventName, (userInfo) => {
    res.status(200).send(userInfo);
  });
});

app.get('/message', async (req, res)=>{
    const messages = await Message.find().sort({date: -1}).limit(10);
    return res.status(200).send(messages);
})

app.listen(PORT, ()=> {
  console.log(`Server was started on ${PORT}`);
})

}

setup();

