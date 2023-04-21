const ws = require('ws');
const { v4: uuid } = require('uuid');
require('dotenv').config();
const PORT = process.env.SOCKET_PORT;
const Message = require('./models/Message');


const users = {};

module.exports = () => {
  const wss = new ws.Server(
    { port: PORT },
    () => {
      console.log(`Socket server started on ${PORT}`);
    }
  );

  const sendToAll = (message) => {
    wss.clients.forEach(ws => ws.send(JSON.stringify(message)));
  }

  wss.on('connection', (ws) => {
    console.log(`New connection was created`);
    ws.on('message', (messageString) => {
      const message = JSON.parse(messageString);
      console.log('message', message);
      if (message.event == 'first-connect') {
        const { userName } = message;
        console.log('websocket first login', userName);
        let connectionCount = 0;

        wss.clients.forEach(client => {
          if (client.userName === userName) {
            connectionCount += 1;
          }
        });
        ws.userName = userName;
        if (connectionCount != 0) {
          return;
        }
        users[userName] = true;
        message.event = 'message';
        message.userName = 'system';
        message.text = `User with name ${userName} was connected to chat`;
      }
      // const savedMessage = new Message({userName: userName, message: message, createdAt: new Date, messageId: uuid()});
      // const doc = savedMessage.save();
      
      // res.send(doc);
      sendToAll(message);
    })

    
    ws.on('close', (reason) => {
      console.log(`Connection was closed ${reason}`);
      let isOnline = false;
      wss.clients.forEach(client => {
        if (client.userName === ws.userName) {
          isOnline = true;
        }
      });
      if (isOnline) {
        return;
      }
      users[ws.userName] = false;
      const message = {
        event: 'message',
        userName: 'system',
        messageId: uuid(),
        text: `User with name ${ws.userName} was disconnected`,
        date: new Date(),
      }
     
      sendToAll(message);
    });
  });
};