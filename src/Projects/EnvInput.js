import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input';
import { Title } from 'chart.js';
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

const AttachmentButton = styled.div`
  width: fit-content;
  padding: 16px;
  background-color: #191b27;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
`;

function EnvInput({onEnvVarChange}) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [kv, setKV] = useState([]);
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleDockerfileKeyChange = (item) => {
    setKey(item)
    onEnvVarChange({"key": item, "value": value})
  };

  const handleDockerfileValueChange = (item) => {
    setValue(item);
    onEnvVarChange({"key": key, "value": item})
  };

  return (
    <div>
          <Input onTextChange={handleDockerfileKeyChange} placeholder={"환경변수 키 입력"} label={"Key"}/>
          <Input onTextChange={handleDockerfileValueChange} placeholder={"환경변수 값 입력"} label={"Value"}/>
        {kv.map((item)=>(
          <AttachmentButton>
            {item.key}: {item.value}  
          </AttachmentButton>
        ))}
    </div>
  );
}

export default EnvInput;