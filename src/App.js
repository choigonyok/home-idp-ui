import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async () => {
    const schema = process.env.HOME_IDP_BACKEND_SCHEMA;
    const host = process.env.HOME_IDP_BACKEND_HOST;
    const port = process.env.HOME_IDP_BACKEND_PORT;
    
    const url = `${schema}://${host}:${port}/manifest?username=choigonyok`;

    const bodyData = {
      message: '@@@@@@@@@@@@@@@@This is the body content@@@@@@@@@@@@@@@@@@@@@@@@@@',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error('Error sending request:', error);
      setResponseMessage('Error sending request');
    }
  };
  return (
    <div className="App">
      <h1>Send POST request to test.com</h1>
      <button onClick={handleSubmit}>Send Request</button>
      <p>Response: {responseMessage}</p>
    </div>
  );
}
export default App;
