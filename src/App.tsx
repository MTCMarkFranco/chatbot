import { DeepChat } from 'deep-chat-react';
import './App.css';
import ReactDOMServer from 'react-dom/server';
import RecordTable from './RecordTable.tsx';
import SynthesisTable from './SynthesisTable.tsx';
import React, { useRef } from 'react';

export const App = () => {
  
  const apiUrl = "http://192.168.2.159:5000/chat";
  const lastQueryResults = useRef(null);
  const initialMessages = [
    { role: 'user', text: 'Hi, what would you like to search on?' },
  ];
  lastQueryResults.current = null;

  const requestInterceptor = (request: any) => {
        
    if(lastQueryResults.current != null)    
      request.body.records = lastQueryResults.current;
    return request;
  }
  
  const responseInterceptor = (response: any) => {
  
    let chatResponse = '';
    let synthesisButton = '';

    if (response.records) {
      lastQueryResults.current = response.records;
      chatResponse = ReactDOMServer.renderToString(<RecordTable records={response.records} />);
      synthesisButton = "<div class='deep-chat-temporary-message'><button class='deep-chat-button deep-chat-suggestion-button' style='margin-top: 5px'>Generate Synthesis?</button></div>";
    } 
    
    if (response.synthesis) {
      chatResponse = ReactDOMServer.renderToString(<SynthesisTable synthesis={response.synthesis} />);
      lastQueryResults.current = null;
    }  

    return {html: chatResponse + synthesisButton};
  }

  return (
    
    <div className="App">
      <DeepChat 
      initialMessages={initialMessages}
      request={{
        url: apiUrl,
        method: "POST",
        headers: {},
        additionalBodyProps: {records: lastQueryResults.current}
      }}
      style={{ borderRadius: 8, width: '100%', height: '100%' }}
      responseInterceptor={responseInterceptor}
      requestInterceptor={requestInterceptor}
      ></DeepChat> 
      
   </div>

  );
}

export default App;
