import { DeepChat } from 'deep-chat-react';
import './App.css';
import React from 'react';

export const App = () => {
  const initialMessages = [
    { role: 'user', text: 'Hi, what would you like to search on?' },
  ];
  
  const responseInterceptor = (response: any) => {
  
    let chatResponse = '';
    
    if (response.records) {
      chatResponse = response.records.map(record => record.filename).join(', ') + 
        '\nWould you like to generate a synhtesis on these records?';
    
    } else if (response.synthesis) {
      chatResponse = response.synthesis.summary;
    }
    
    return {text: chatResponse};
  }

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
    responseInterceptor={responseInterceptor}
  ></DeepChat> 
      
   </div>

  );
}

export default App;
