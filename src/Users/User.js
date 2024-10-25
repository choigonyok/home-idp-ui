import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Namespaces from '../Resources/Namespaces';
import { stringify } from 'uuid';
import Popup from '../Projects/Popup';
import DockerfileInput from '../Projects/DockerfileInput';
import NewUserForm from './NewUserForm';
import EditUserForm from './EditUserForm';

function User() {
  const [clickNewUser, setClickNewUser] = useState(false);
  const [clickUser, setClickUser] = useState("");
  const [checkedPods, setCheckedPods] = useState([]);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState(new Map());
  const [namespace, setNamespace] = useState("");
  
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleNewUser = () => {
    setClickNewUser(!clickNewUser);
  }

  const addKeyValue = (key, value) => {
    setRole((prevMap) => {
      const updatedMap = new Map(prevMap); // 기존 Map을 복사
      updatedMap.set(key, value); // 새로운 키-값 추가
      return updatedMap; // 업데이트된 Map 반환
    });
  };

  const getValueByKey = (key) => {
    return role.get(parseInt(key));
  };

  const handleClickUser = (name) => {
    setClickUser(name)
  };
  

  useEffect(() => {
    if (users.length === 0) {
      return;
    }
    users.map((usr)=> {
      axios.get(url+'/api/users/'+usr.id+'/role')
        .then(response => {
          addKeyValue(response.data.id, response.data.name);
        })
        .catch(error => {
          console.error('Error fetching progress:', error);
      });
    })
  }, [users])

  const handleNamespace = (ns) => {
    setNamespace(ns);
  }

  useEffect(() => {
    if (namespace === "") {
      return;
    }
    axios.get(url+'/api/projects/'+namespace+'/users')
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error('Error fetching progress:', error);
    });
  }, [namespace])
    
  
  return (
    <div>
      <h1>Users</h1>

      <Namespaces onSelectNamespace={handleNamespace}/>
      <div>
        <br/>
        <button className='btn' onClick={handleNewUser}>New User</button>
      </div>
      {clickNewUser? 
      <Popup handleClose={handleNewUser} component={<NewUserForm project={namespace}/>}/>
      :  
      ""
      }

      <br/>
      <table border="1" cellPadding="10" cellSpacing="0" className='dashboard-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item, index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td onClick={() =>handleClickUser(item.name)} >{item.name}</td>
            <td>{getValueByKey(item.role_id)}</td>
            <td>{item.create_time}</td>
            {clickUser === item.name ?
              <Popup handleClose={handleClickUser} component={<EditUserForm handleClose={handleClickUser} project={namespace} role_name={getValueByKey(item.role_id)} username={item.name}/>}/>
            :
              "" 
            }
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}

export default User;




