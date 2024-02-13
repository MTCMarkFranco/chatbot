import { DeepChat } from 'deep-chat-react';
import './App.css';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RecordTable from './RecordTable.tsx';
import SynthesisTable from './SynthesisTable.tsx';

export const App = () => {
  const initialMessages = [
    { role: 'user', text: 'Hi, what would you like to search on?' },
  ];
  
  const responseInterceptor = (response: any) => {
  
    let chatResponse = '';
    
    if (response.records) {
      chatResponse = ReactDOMServer.renderToString(<RecordTable records={response.records} />);

    } else if (response.synthesis) {
      chatResponse = ReactDOMServer.renderToString(<SynthesisTable synthesis={response.synthesis} />);
    } else if (response.None) {
      chatResponse = "<p>Ok, Let's start a new search. What would you like to search on?</p>";
    }
    
    return {html: chatResponse};
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
