const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const path = require('path');
const setTelegramWebHook = require('./telegramBot');
const setupWebSocket = require('./webSocket');
const PORT = process.env.PORT;

const app = express();
setupWebSocket();
const emitter = new events.EventEmitter();

app.use(cors());
app.use(bodyParser.json());
setTelegramWebHook(app, emitter);

app.use(express.static(path.join(__dirname, '../public/build')));

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

app.listen(PORT, ()=> {
  console.log(`Server was started on ${PORT}`);
})