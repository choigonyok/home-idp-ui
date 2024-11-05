import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Input from './Input';
import CustomTextarea from './CustomTextarea';
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


function DockerfileInput({onClose}) {
  const [imageName, setImageName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [imageVersion, setImageVersion] = useState('');
  const [repo, setRepo] = useState('');
  const [content, setContent] = useState('');
  const [traceId, setTraceId] = useState('');
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  
  const handleDockerfileContentChange = (value) => {
    setContent(value);
  };
  const handleDockerfileImageNameChange = (e) => {
    setImageName(e.target.value);
  };

  const handleDockerfileImageVersionChange = (e) => {
    setImageVersion(e.target.value);
  };
  const handleDockerfileRepoChange = (e) => {
    setRepo(e.target.value);
  };

  const handleClosePopup = () => {
    setRepo('')
    setImageVersion('')
    setImageName('')
    setContent('')
    onClose()
  };
  
  const onSave = async (event) => {
    const id = uuidv4();
    event.preventDefault();
    const bodyData = {
      image_name: imageName,
      image_version: imageVersion,
      repository: repo,
      content: content,
      trace_id: id,
    };

    try {
      const response = await fetch(url+"/api/dockerfile", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });
      const data = await response.json();
    } catch (error) {
      console.error('Error sending request:', error);
    }

    setTraceId(id);
  };

  return (
    <div>
      <Input onChange={handleDockerfileImageNameChange} placeholder={"nginx"} value={imageName} label={"Image"}/>
      <Input onChange={handleDockerfileImageVersionChange} placeholder={"latest"} value={imageVersion} label={"Tag"}/>
      <Input onChange={handleDockerfileRepoChange} placeholder={"https://github.com/choigonyok/home-idp.git"} value={repo} label={"Git Repo"}/>
      <br/>
      <CustomTextarea onTextChange={handleDockerfileContentChange} placeholder={`FROM golang:1.21\n\nCOPY . .\n\nRUN go mod download\n\ngo build ./main.go\n\nCMD ["./main"]`}/>
      <ButtonRow>
        <CloseButton onClick={onSave}>Save</CloseButton>
        <CloseButton onClick={handleClosePopup}>Close</CloseButton>
      </ButtonRow>        
      <div>
        RESPONSE: {responseMessage}
      </div>
      {/* {statusBar? 
        <ProgressBar name={imageName} tag={imageVersion}/>
      :
      ""
      } */}
    </div>
  );
}

export default DockerfileInput;