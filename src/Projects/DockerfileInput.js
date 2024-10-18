import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

function DockerfileInput() {
  const [dockerfile, setDockerfile] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageTag, setImageTag] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [statusBar, setStatusBar] = useState(false);
  

  const handleInputChange = (event) => {
    setDockerfile(event.target.value);
  };

  const handleImageNameChange = (e) => {
    setImageName(e.target.value);
  };

  const handleImageTagChange = (e) => {
    setImageTag(e.target.value);
  };

  const openStatusBar = () => {
    setStatusBar(!statusBar);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const bodyData = {
      content: dockerfile,
      image: imageName+":"+imageTag,
      username: "choigonyok",
    };
    console.log('Body:', bodyData);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      console.log(bodyData);
      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error('Error sending request:', error);
      setResponseMessage('Error sending request');
    }
    
  };

  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  
  const url = `${schema}://${host}:${port}/api/dockerfile`;

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '400px' }}>
      <h2>Dockerfile Input Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dockerfile">Enter your Dockerfile:</label>
        <br />

        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="imageName"
            value={imageName}
            onChange={handleImageNameChange}
            placeholder="이미지 이름 입력"
          />
        </div>

        <div>
          <label htmlFor="subtitle">부제목:</label>
          <input
            type="text"
            id="imageTag"
            value={imageTag}
            onChange={handleImageTagChange}
            placeholder="이미지 태그 입력"
          />
        </div>
        <textarea
          id="dockerfile"
          name="dockerfile"
          value={dockerfile}
          onChange={handleInputChange}
          rows="10" // 텍스트 입력창 높이 (줄 수)
          cols="50" // 텍스트 입력창 너비
          placeholder="Enter your Dockerfile here..."
          style={{ width: '100%', padding: '10px', marginTop: '10px', fontFamily: 'monospace', fontSize: '14px' }}
        />
        <br />
        <button type="submit" onClick={openStatusBar} style={{ marginTop: '10px', padding: '10px 20px' }}>Submit Dockerfile</button>
      </form>

      <div>
        RESPONSE: {responseMessage}
      </div>
      {statusBar? 
        <ProgressBar name={imageName} tag={imageTag}/>
      :
      ""
      }
    </div>
  );
}

export default DockerfileInput;