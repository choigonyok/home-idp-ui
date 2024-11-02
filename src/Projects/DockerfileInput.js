import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function DockerfileInput() {
  const [dockerfile, setDockerfile] = useState('');
  const [imageName, setImageName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [statusBar, setStatusBar] = useState(false);
  const [imageVersion, setImageVersion] = useState('');
  const [repo, setRepo] = useState('');
  const [content, setContent] = useState('');
  const [traceId, setTraceId] = useState('');
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  
  const handleDockerfileContentChange = (e) => {
    setContent(e.target.value);
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

  const openStatusBar = () => {
    setStatusBar(!statusBar);
  };
  
  const handleDockerfileSubmit = async (event) => {
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
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '400px' }}>
      <h2>Dockerfile Input Form</h2>
      <form onSubmit={handleDockerfileSubmit}>
        <div>
          <div>
            <label htmlFor="title">이미지 이름</label>
          </div>
          <input
            type="text"
            id="imageName"
            value={imageName}
            onChange={handleDockerfileImageNameChange}
            placeholder="이미지 이름 입력"
          />
        </div>
        <br/>
        <div>
          <div>
            <label htmlFor="subtitle">이미지 버전</label>
          </div>
          <input
            type="text"
            id="imageVersion"
            value={imageVersion}
            onChange={handleDockerfileImageVersionChange}
            placeholder="이미지 태그 입력"
          />
        </div>
        <br/>
        <div>
          <div>
            <label htmlFor="subtitle">{
              <div>
                <div>소스코드 레포지토리</div>
                {"ex) https://github.com/{username}/{reponame}/.git"}
              </div>
            }</label>
          </div>
          <input
          type="text"
          id="repository"
          value={repo}
          onChange={handleDockerfileRepoChange}
          placeholder="repository 입력"
        />
        </div>
        <br/>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={handleDockerfileContentChange}
          rows="10"
          cols="50"
          placeholder="Enter your Dockerfile here..."
          style={{ width: '100%', padding: '10px', marginTop: '10px', fontFamily: 'monospace', fontSize: '14px' }}
        />
        <br />
        <button type="submit" onClick={openStatusBar} style={{ marginTop: '10px', padding: '10px 20px' }}>Submit Dockerfile</button>
      </form>

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