import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Box.css';
import { Title } from 'chart.js';
import styled from "styled-components";
import AutoComplete from './AutoComplete';

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

function EnvSearch({suggestions, onEnvVarChange}) {
  const [envVars, setEnvVars] = useState([]);

  const handleOnAdd = (v) => {
    setEnvVars([...envVars, {"key": v.key, "value": v.value, "creator": v.creator, "secret": v.secret}])
    onEnvVarChange([...envVars, {"key": v.key, "value": v.value, "creator": v.creator, "secret": v.secret}])
  };

  return (
    <div>
          <AutoComplete label="Key" suggestions={suggestions} onAdd={handleOnAdd}/>
          <div className='row'>
            {envVars.map((item)=>(
              <AttachmentButton>
                {item.secret} : {item.key}
              </AttachmentButton>
            ))}
          </div>
    </div>
  );
}

export default EnvSearch;