import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from './Select.css'

function Users({project, onSelectUser}) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleUser = (e) => {
    setSelectedUser(e.target.value);
    onSelectUser(e.target.value);
    
  }

  // console.log(selectedUser);

  useEffect(() => {
    if (project === "") {
      return;    
    }
    axios.get(url+'/api/projects/'+project+'/users')
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
      });
  }, [project])

  return (
      <select class="harbor-select" value={selectedUser} onChange={handleUser}>
        <option value="" >All Users</option>
        {users.map((item) => (
          <option value={item.name}>{item.name}</option>
        ))}
      </select>
  )
}

export default Users;