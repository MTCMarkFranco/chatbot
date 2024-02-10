import { DeepChat } from 'deep-chat-react';
import './App.css';
import React from 'react';

export const App = () => {
  const initialMessages = [
    { role: 'user', text: 'Hi, what would you like to search on?' },
  ];
  
  return (
    
    <div className="App">
    <DeepChat
    initialMessages={initialMessages}
    request={{
      url: "http://127.0.0.1:5000/query",
      method: "POST",
      headers: {},
      additionalBodyProps: {}
    }}
    style={{ borderRadius: 8, width: '100%', height: '100%' }}
  ></DeepChat> 
      
   </div>

  );
}

export default App;
