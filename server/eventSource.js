const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const path = require('path');
const bot = require('./telegramBot');

const PORT = 8000;

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public/build')));

const start = async () => {
  app.get('/connect', (req, res) => {
    res.writeHead(
      200,
      {
        'Connection': 'keep alive',
        'Connect-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
      }
    )
  
    emitter.on('new-message', (message) => {
        console.log('message', message);
        res.write(`data ${JSON.stringify(message)} \n\n`);
    });
  });
  
  app.post('/messages', (req, res) => {
      const message = req.body;
      console.log('message', message);
      emitter.emit('new-messages', message);
      return res.status(200).send();
  });
  await bot(app, emitter);
  app.listen(PORT, () => { 
    console.log(`Server was started on ${PORT}`);
  })
}

start();