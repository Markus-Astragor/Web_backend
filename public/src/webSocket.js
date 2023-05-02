import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import './style.css';
import './loader.css';
import { v4 as uuid } from 'uuid';
import like from './images/like.png';
import selectedLike from './images/like_selected.png';

let SOCKET_BASE_URL = process.env.REACT_APP_SOCKET_BASE_URL;
// let SOCKET_BASE_URL = 'ws://localhost:5000';
let BASE_URL = 'http://localhost:8080'

console.log(SOCKET_BASE_URL);

const WebSocketChat = () => {
  const userNameStorage = localStorage.getItem('userName');
  const [userName, setUserName] = useState(userNameStorage || '');
  const [messagesFromDb, setMessagesFromDb] = useState([]);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  //////////////////////Get messages from DataBase
  const getMessages = async() =>{
      const {data} = await axios.get(`${BASE_URL}/message`);
      const reversed = data.reverse();
      console.log('data', reversed);
      reversed.forEach(element => {
        setMessagesFromDb(prev => [...prev, element]);
      });
  }

//////////////////////Get users
  const getUsers = async () => {
    const {data} = await axios.get(`${BASE_URL}/message`);
    console.log('data', data);
  }


  const id = uuid();

  const subscribeOnAuth = async () => {
    try {
      const { data } = await axios.get(`/login?id=${id}`);
      const name = `${data.firstName} ${data.lastName}`;
      console.log('name',name);
      setUserName(name);
      localStorage.setItem('userName', name);
      setShowLogin(false);
    } catch (err) {
      console.error(err);
      subscribeOnAuth();
    }
  };

  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const subscribe = async () => {
    console.log(showLogin);
    socket.current = new WebSocket(SOCKET_BASE_URL);
    socket.current.onopen = () => {
      console.log(`WebSocket connection was created with:${SOCKET_BASE_URL}`);
      setConnected(true);
      const nameLocalSorage = localStorage.getItem('userName');
      console.log('userNAME', nameLocalSorage);
      const message = {
        event: 'first-connect',
        messageId: uuid(),
        userName: nameLocalSorage,
        date: Date.now()
      };
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onclose = (event) => {
      console.log(`WebSocket connection was closed`, event);
      setConnected(false);
      // setTimeout(() => {
      //   console.log(`WebSocket connection retried`);
      //   subscribe();
      // }, 1000);
    };
    socket.current.onerror = (error) => {
      console.log(`WebSocket connection has error`, error);
    };

    socket.current.onmessage = (event) => {
      const messageString = event.data.toString();
      console.log(`WebSocket connection has message:${messageString}`);
      const message = JSON.parse(messageString);
      switch (message.event) {
        case 'message':
          setMessages((prev) => [...prev, message]);
          break;
        case 'emoji':
          setMessages((prev) => {
            const current = prev.find(e => e.messageId == message.selectedMessageId);
            if (!current) {
              return prev;
            }
            if (!current.likes) {
              current.likes = { positive: 0, negative: 0 };
            }
            if (message.data == 'like') {
              current.likes.positive += 1;
            } else {
              current.likes.negative += 1;
            }
            return [...prev];
          });
      }
    };
  };
  useEffect(() => {
    if (userName ) {
      setUserName(userName);
      setShowLogin(false);
      getMessages();
      subscribe();
    } else {
      subscribeOnAuth()
        .then(() => {
          getMessages();
          subscribe()
          
        });
    }
  }, []);

  const sendMessage = async () => {
    const message = {
      event: 'message',
      messageId: uuid(),
      userName,
      text: value,
      date: Date.now()
    };
    socket.current.send(JSON.stringify(message));
  };

  return (
    <>
      <div className="login" style={{ display: showLogin || !connected ? 'flex' : 'none' }}>
        <input type="text" value={id} readOnly />
        {
          (!userName || !connected) &&
          <div class="lds-facebook"><div></div><div></div><div></div></div>
        }
      </div>
      <div className="container">
        <div className="form">
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)} />
          <button onClick={sendMessage}>Send message</button>
        </div>
        <div className="messages">
        {
          messagesFromDb.map(message=> <div>
             <div className="userInfo">
              <b>{message.userName}</b><br />
              <b style={{ fontSize: '10px' }}>{new Date(message.createdAt).toISOString()}</b>
            </div>
            <div className="message">{message.message}</div>
          </div>)
        }
          {messages.map(message => <div>
            <div className="userInfo">
              <b>{message.userName}</b><br />
              <b style={{ fontSize: '10px' }}>{new Date(message.date).toISOString()}</b>
            </div>
            <div className="message">{message.text}</div>
          </div>)}
        </div>
      </div>
    </>
  );
};

export default WebSocketChat;