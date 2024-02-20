import { DeepChat } from 'deep-chat-react';
import './App.css';
import ReactDOMServer from 'react-dom/server';
import RecordTable from './RecordTable.tsx';
import SynthesisTable from './SynthesisTable.tsx';
import React, { useRef } from 'react';

export const App = () => {
  
  const apiUrl = "http://192.168.2.159:5000/chat";
  const lastQueryResults = useRef(null);
  const deepchatref = useRef(null);
  const initialMessages = [
    { role: 'user', text: 'Hi, what would you like to search on?' },
  ];
  lastQueryResults.current = null;

  const requestInterceptor = (request: any) => {
        
    let messages = deepchatref.current.getMessages();
    let lastMessage = messages[messages.length - 1];

    if(lastQueryResults.current != null && lastMessage.text.toLowerCase() === 'generate synthesis') {   
      request.body.records = lastQueryResults.current;
      request.body.generate_synthesis = true;
    }
    return request;    
  }
  
  
  const responseInterceptor = (response: any) => {
  
    let chatResponse = '';
    let synthesisButton = '';

    if (response.records && response.records.length > 0) {
      lastQueryResults.current = response.records;
      chatResponse = ReactDOMServer.renderToString(<RecordTable records={response.records} />);
      synthesisButton = "<div class='deep-chat-temporary-message'><button class='deep-chat-button deep-chat-suggestion-button' style='margin-top: 5px'>Generate Synthesis</button></div>";
    } 
    
    if (response.synthesis) {
      chatResponse = ReactDOMServer.renderToString(<SynthesisTable synthesis={response.synthesis} />);
      lastQueryResults.current = null;
    }

    if(chatResponse === '') {
      chatResponse = 'No records found... Please try again.';
    }

    return {html: chatResponse + synthesisButton};
  }

  return (
    
    <div className="App">
      <DeepChat ref={deepchatref} 
      initialMessages={initialMessages}
      request={{
        url: apiUrl,
        method: "POST",
        headers: {},
        additionalBodyProps: {records: lastQueryResults.current}
      }}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        borderColor: '#e4e4e4',
        // background: 'linear-gradient(90deg, rgb(239, 242, 247) 0%, 7.60286%, rgb(237, 240, 249) 15.2057%, 20.7513%, rgb(235, 239, 248) 26.297%, 27.6386%, rgb(235, 239, 248) 28.9803%, 38.2826%, rgb(231, 237, 249) 47.585%, 48.1216%, rgb(230, 236, 250) 48.6583%, 53.1306%, rgb(228, 236, 249) 57.6029%, 61.5385%, rgb(227, 234, 250) 65.4741%, 68.7835%, rgb(222, 234, 250) 72.093%, 75.7603%, rgb(219, 230, 248) 79.4275%, 82.8265%, rgb(216, 229, 248) 86.2254%, 87.8354%, rgb(213, 228, 249) 89.4454%, 91.8605%, rgb(210, 226, 249) 94.2755%, 95.4383%, rgb(209, 225, 248) 96.6011%, 98.3005%, rgb(208, 224, 247) 100%)'
      }}
      responseInterceptor={responseInterceptor}
      requestInterceptor={requestInterceptor}
      ></DeepChat> 
      
   </div>

  );
}

export default App;
