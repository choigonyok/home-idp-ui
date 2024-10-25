import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'axios';

function NewUserForm({project, handleClose}) {
  const [username, setUsername] = useState('');
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState([]);
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("role:"+selectedRole);
    console.log("name:"+username);

    axios.post(url+'/api/projects/'+project+'/user', {
      name: username,
      role_id: selectedRole
    })
    .then(response => {
      handleClose(false)
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRole = (e) => {
    setSelectedRole(e.target.value);
  }

  useEffect(() => {
    axios.get(url+'/api/roles')
      .then(response => {
        setRoles(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '400px' }}>
      <h2>New User</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dockerfile">Enter your Dockerfile:</label>
        <br />

        <div className='keybox'>
          <label htmlFor="title">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="사용자 이름 입력"
            
          />
        </div>

        <div>
          <select class="harbor-select" value={selectedRole} onChange={handleRole}>
          <option value="" disabled>Select Role</option>
          {roles.length !== 0 ? 
            roles.map((item) => (
            <option value={item.name}>{item.name}</option>
            ))
            :
            "["
          }
        </select>
      </div>

        <br />
        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>Create</button>
      </form>

    </div>
  );
}

export default NewUserForm;