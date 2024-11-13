import React, { useState, useEffect } from 'react';
import Input from './Input';
import Select from './Select';
import axios from 'axios';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Forbidden from '../Components/Forbidden';

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

function UserInput({onUserChange, userData}) {
  const navigate = useNavigate();
  const [key, setKey] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  
  const [fileContent, setFileContent] = useState('');
  const [filename, setFilename] = useState('');
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  const [forbidden, setForbidden] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }

    axios.get(url+'/api/roles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setRoles(response.data.map((item)=>(
          {
            name: item.role.name,
            id: item.role.id,
          }
          
        )))
      })
      .catch(error => {
        if (error.response.status === 403) {
          setForbidden(error.response.data)
        } else if (error.response.status === 401) {
          navigate("/login")
        }
        console.error('Error fetching progress:', error);
      });
  }, [])

  const handleUsernameChange = (value) => {
    onUserChange({"user_id": userData.user_id,"username": value, "role_id": userData.role_id, "role": userData.role})
  };
  const handleRoleChange = (value) => {
    onUserChange({"user_id": userData.user_id, "username": userData.username, "role_id": value, "role": userData.role})
  };

  return (
    <div>
    {forbidden === "" ?
      <div>
        <Input onTextChange={handleUsernameChange} value={userData.username} placeholder={"choigonyok"} label="Username"/>
        <Select placeholder={"Select Role"} label="Role" value={userData.role_id} options={roles} onChange={handleRoleChange} /> 
      </div>
      : <Forbidden message={forbidden}/>}
    </div>
  );
}

export default UserInput;