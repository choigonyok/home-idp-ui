import React, { useState, useEffect } from 'react';
import Input from './Input';
import axios from 'axios';
import styled from "styled-components";

const CloseButton = styled.button`
margin-top: 16px;
padding: 8px 16px;
background: #333;
color: white;
border: none;
border-radius: 8px;
cursor: pointer;
`;

const ButtonRow = styled.div`
display: flex;
align-items: center;
gap: 16px;
`;

function UserInput({onNamespace, onClose}) {
  const [key, setKey] = useState('');
  const [file, setFile] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  const [fileContent, setFileContent] = useState('');
  const [filename, setFilename] = useState('');
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`


  const handleClosePopup = () => {
    setEmail('')
    setUsername('')
    onClose()
  }

  useEffect(() => {
    if (file === "") return;
    setFilename(file.name)
    const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
  }, [file])

  const onSave = async (event) => {
    event.preventDefault(); 

    const jsonBody = {
      username: username,
      email: email,
    }

    try {
      const response = await fetch(url+"/api/projects/"+onNamespace+"/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
      });
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  return (
    <div>
      <Input onChange={handleUsernameChange} placeholder={"choigonyok"} label="Username"/>
      <Input onChange={handleEmailChange} value={email} placeholder={"example@naver.com"} label="Email"/>
      <ButtonRow>
        <CloseButton onClick={onSave}>Save</CloseButton>
        <CloseButton onClick={handleClosePopup}>Close</CloseButton>
      </ButtonRow>        
    </div>
  );
}

export default UserInput;