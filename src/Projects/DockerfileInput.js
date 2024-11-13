import React, { useEffect, useState } from 'react';
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

function DockerfileInput({onDockerfileChange}) {
  const [imageName, setImageName] = useState('');
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
  const handleDockerfileImageNameChange = (value) => {
    setImageName(value);
  };

  const handleDockerfileImageVersionChange = (value) => {
    setImageVersion(value);
  };
  const handleDockerfileRepoChange = (value) => {
    setRepo(value);
  };

  useEffect(()=>{
    onDockerfileChange({
      image_name: imageName,
      image_version: imageVersion,
      repository: repo,
      content: content,
    })
  },[imageName, imageVersion, repo, content])


  return (
    <div>
      <Input onTextChange={handleDockerfileImageNameChange} placeholder={"nginx"} value={imageName} label={"Image"}/>
      <Input onTextChange={handleDockerfileImageVersionChange} placeholder={"latest"} value={imageVersion} label={"Tag"}/>
      <Input onTextChange={handleDockerfileRepoChange} placeholder={"https://github.com/choigonyok/home-idp.git"} value={repo} label={"SourceCode Repository"}/>
      <br/>
      <CustomTextarea label={"Dockerfile"} onTextChange={handleDockerfileContentChange} placeholder={`FROM golang:1.21\n\nCOPY . .\n\nRUN go mod download\n\ngo build ./main.go\n\nCMD ["./main"]`}/>
    </div>
  );
}

export default DockerfileInput;