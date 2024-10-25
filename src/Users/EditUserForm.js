import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditUserForm({project, role_name, username, handleClose}) {
  const [selectedRole, setSelectedRole] = useState(role_name);
  const [roles, setRoles] = useState([]);
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.put(url+'/api/projects/'+project+'/users/'+username, {
      role_id: selectedRole
    })
    .then(response => {
      handleClose(false)
    })
    .catch(error => {
      console.log(error);
    });
  }

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
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dockerfile">Enter your Dockerfile:</label>
        <br />

        <div>
          <select class="harbor-select" value={selectedRole} onChange={handleRole}>
          {roles.length !== 0 ? 
            roles.map((item) => (
            <option value={item.name}>{item.name}</option>
            ))
            :
            ""
          }
          </select>
        </div>

        <br />
        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>Update</button>
      </form>

    </div>
  );
}

export default EditUserForm;