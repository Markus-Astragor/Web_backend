import logo from './logo.svg';
import './App.css';
import EventSourceChat from './EventSource';
import WebSocketChat from './webSocket';


function App() {
  return (
    <div className="App">
      {/* <EventSourceChat/> */}
      <WebSocketChat/>
    </div>
  );
}

export default App;
