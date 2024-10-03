import React, { useState } from 'react';
import './App.css';

function Test() {
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async () => {
    const schema = process.env.REACT_APP_BACKEND_SCHEMA;
    const host = process.env.REACT_APP_BACKEND_HOST;
    const port = process.env.REACT_APP_BACKEND_PORT;
    
    const url = `${schema}://${host}:${port}/api/manifest?username=choigonyok`;

    console.log(url);
    console.log(url);
    console.log(url);

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
      <header className="App-header">
        <h1>Send POST request to test.com</h1>
        <button onClick={handleSubmit}>Send Request</button>
        <p>Response: {responseMessage}</p>
      </header>
    </div>
  );
}

export default Test;