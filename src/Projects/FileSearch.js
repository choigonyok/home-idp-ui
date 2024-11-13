import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Box.css';
import { Title } from 'chart.js';
import styled from "styled-components";
import FileAutoComplete from './FileAutoComplete';
import Input from './Input';

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

function FileSearch({ suggestions, onFileChange }) {
  const [kv, setKV] = useState([]);
  const [files, setFiles] = useState([]);
  const [mountPath, setMountPath] = useState('');
  const [errorEmptyMountPath, setErrorEmptyMountPath] = useState(false);
  
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleOnAdd = (value) => {
    if (mountPath !== '') {
      setFiles([...files, {"name": value.name, "mount_path": mountPath, "services": value.mount_services, "configmap": value.configmap}])
      onFileChange([...files, {"name": value.name, "mount_path": mountPath, "services": value.mount_services, "configmap": value.configmap}])
      setMountPath('')
      return
    }
    setErrorEmptyMountPath(true)
  };

  const handleFileMountPathChange = (value) => {
    setErrorEmptyMountPath(false)
    setMountPath(value)
  };

  return (
    <div>
          <FileAutoComplete label="Name" suggestions={suggestions} onAdd={handleOnAdd}/>
          <Input error={errorEmptyMountPath} onTextChange={handleFileMountPathChange} placeholder={"/etc/nginx/conf.d"} value={mountPath} label={"Mount Path"}/>
          <div className='row'>
            {files.map((item)=>(
              <AttachmentButton>
                {item.name} : {item.mount_path}
              </AttachmentButton>
            ))}
          </div>
    </div>
  );
}

export default FileSearch;