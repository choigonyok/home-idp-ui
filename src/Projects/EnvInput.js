import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input';
import { Title } from 'chart.js';
import styled from "styled-components";

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

function EnvInput({onNamespace, onSendData}) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [kv, setKV] = useState([]);
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleDockerfileKeyChange = (value) => {
    setKey(value);
  };

  const handleDockerfileValueChange = (value) => {
    setValue(value);
  };
  
  const handleEnvSubmit = (event) => {
    event.preventDefault(); 

    onSendData(kv)
  };

  console.log(kv)
  
  const addEnv = (k, v) => {
    if (kv.findIndex((item) => item.key === k) !== -1 ) {
      const tmp = [...kv]
      tmp[kv.findIndex((item) => item.key === k)] = {"key": k, "value": v}
      setKV(tmp)
      return
    }
    setKV([...kv, {"key":k, "value":v}])
  }

  return (
    <div>
          <Input onChange={handleDockerfileKeyChange} placeholder={"환경변수 키 입력"} label={"Key"}/>
          <Input onChange={handleDockerfileValueChange} placeholder={"환경변수 값 입력"} label={"Value"}/>
        {kv.map((item)=>(
          <AttachmentButton>
            {item.key}: {item.value}  
          </AttachmentButton>
        ))}
        <div>
          <button  onClick={()=>addEnv(key, value)} style={{ marginTop: '10px', padding: '10px 20px' }}>Apply</button>
        </div>
        <br />
        <button onClick={handleEnvSubmit} style={{ marginTop: '10px', padding: '10px 20px' }}>Save</button>
    </div>
  );
}

export default EnvInput;