import React, { useState, useEffect } from 'react';
import axios from 'axios';
import File from './File';
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

function FileInput({onFileChange}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onFileChange({"filename": file.name, "fileContent": event.target.result})
      };
      reader.readAsText(file);
    }
    
  };

  return (
    <div>
      <File onChange={handleFileChange} label={"Add File"}/>
    </div>
  );
}

export default FileInput;