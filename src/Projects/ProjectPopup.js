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

function ProjectPopup({onProjectChange}) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleProjectNameChange = (value) => {
    onProjectChange({"name": value, "description": projectDescription})
    setProjectName(value);
  };
  const handleProjectDescriptionChange = (value) => {
    onProjectChange({"name": projectName, "description": value})
    setProjectDescription(value);
  };
  
  return (
    <div>
      <Input onTextChange={handleProjectNameChange}  value={projectName} placeholder={"new-project"} label={"Name"}/>
      <Input onTextChange={handleProjectDescriptionChange} value={projectDescription} placeholder={"This is new project for toy project"} label={"Description"}/>
    </div>
  );
}

export default ProjectPopup;