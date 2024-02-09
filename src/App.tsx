import { DeepChat } from 'deep-chat-react';
import './App.css';
import React from 'react';

export const App = () => {
  const initialMessages = [
    { role: 'user', text: 'Hey, how are you today?' },
    { role: 'ai', text: 'I am doing very well!' },
  ];
  
  return (
    
    <div className="App">
    
      <DeepChat
        demo={true}
        style={{ borderRadius: '10px' }}
        textInput={{ placeholder: { text: 'Welcome to the demo!' } }}
        initialMessages={initialMessages}
      />
      </div>

  );
}

export default App;
