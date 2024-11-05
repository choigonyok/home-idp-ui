import React, { useState, useEffect } from 'react';
import axios from 'axios';
import File from './File';

function FileInput({onNamespace}) {
  const [key, setKey] = useState('');
  const [file, setFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [filename, setFilename] = useState('');
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setKey(file.name)

      // 파일 내용을 읽어오기
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result); // 파일 내용을 상태에 저장
      };
      reader.readAsText(file); // 텍스트 파일로 읽기
    }
  };

  const handleFileSubmit = async (event) => {
    event.preventDefault(); 

    const jsonBody = {
      filename: key,
      fileContent: fileContent,
    }
    
    try {
      const response = await fetch(url+"/api/projects/"+onNamespace+"/configmap", {
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

  return (
    <div>
      
      <File onChange={handleFileChange} label={"Add File"}/>
      <button onClick={handleFileSubmit} style={{ marginTop: '10px', padding: '10px 20px' }}>Save</button>
    </div>
  );
}

export default FileInput;