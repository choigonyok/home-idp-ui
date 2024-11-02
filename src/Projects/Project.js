import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Namespaces from '../Resources/Namespaces';
import Box from './Box.css';
import KialiStyleFlowChart from './KialiStyleFlowChart';
import NetworkFlow from './NetworkFlow';

function Project() {
  const [data, setData] = useState([]);
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  const [namespace, setNamespace] = useState("");
  const [clickUser, setClickUser] = useState("");
  const [clickRole, setClickRole] = useState("");
  const [clickSecretKey, setClickSecretKey] = useState("");
  const [clickSecretValue, setClickSecretValue] = useState("");
  const [clickFileTarget, setClickFileTarget] = useState([]);
  const [clickFileName, setClickFileName] = useState("");
  const [clickDockerfileName, setClickDockerfileName] = useState("");
  
  
  const [users, setUsers] = useState([]);
  const [dockerfiles, setDockerfiles] = useState([]);
  const [dockerfileExist, setDockerfileExist] = useState(false);
  const [role, setRole] = useState(new Map());
  const [userIdName, setUserIdName] = useState(new Map());
  const [secret, setSecret] = useState([]);
  const [configmap, setConfigmap] = useState([]);

  useEffect(() => {
    if (dockerfiles.length !== 0) setDockerfileExist(true);
  }, [dockerfiles])
  
  const handleNamespace = (ns) => {
    setNamespace(ns);
  }

  const handleClickUser = (name) => {
    setClickUser(name)
    console.log("name:", name)
  };

  const handleClickRole = (role_id) => {
    setClickRole(role_id)
    console.log("roleid:", role_id)
  };

  const handleClickSecretKey = (key) => {
    setClickSecretKey(key)
    console.log("key:", key)
  };

  const handleClickSecretValue = (value) => {
    setClickSecretValue(value)
    console.log("value:", value)
  };

  const handleClickFilename = (name) => {
    setClickFileName(name)
    console.log("name:", name)
  };

  const handleClickFileTarget = (services) => {
    setClickFileTarget(services)
    console.log("services:", services)
  };

  const handleClickDockerfileName = (name) => {
    setClickDockerfileName(name)
    console.log("name:", name)
  };
  

  useEffect(() => {
    axios.get(url+'/api/projects?user_id=1')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
      });
  }, [])

  const addKeyValue = (key, value) => {
    setRole((prevMap) => {
      const updatedMap = new Map(prevMap); // 기존 Map을 복사
      updatedMap.set(key, value); // 새로운 키-값 추가
      return updatedMap; // 업데이트된 Map 반환
    });
  };

  const addKeyValueUser = (key, value) => {
    setUserIdName((prevMap) => {
      const updatedMap = new Map(prevMap); // 기존 Map을 복사
      updatedMap.set(key, value); // 새로운 키-값 추가
      return updatedMap; // 업데이트된 Map 반환
    });
  };


  const getValueByKey = (key) => {
    return role.get(key);
  };

  const getValueByKeyUser = (key) => {
    return userIdName.get(key);
  };

  useEffect(() => {
    if (users.length === 0) {
      return;
    }
    users.map((u) => (
      addKeyValueUser(u.id, u.name)
    ))

    users.map((usr)=> {
      axios.get(url+'/api/users/'+usr.name+'/role')
        .then(response => {
          addKeyValue(response.data.id, response.data.name);
        })
        .catch(error => {
          console.error('Error fetching progress:', error);
      });

    axios.get(url+'/api/users/'+usr.name+'/dockerfiles')
      .then(response => {
        setDockerfiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
      });
    })

  }, [users])
  
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

    axios.get(url+'/api/projects/'+namespace+'/secrets')
    .then(response => {
      setSecret(response.data);
    })
    .catch(error => {
      console.error('Error fetching progress:', error);
    });

    axios.get(url+'/api/projects/'+namespace+'/configmaps')
    .then(response => {
      setConfigmap(response.data);
      console.log(response.data)
    })
    .catch(error => {
      console.error('Error fetching progress:', error);
    });
  }, [namespace])

  return <div>
    {namespace === "" ?
      <h1>Project Page</h1>
      :
      <h1>{namespace}</h1>
    }
    <Namespaces onSelectNamespace={handleNamespace}/>
    <div>
      <h2>Users</h2>
      <table border="1" cellPadding="10" cellSpacing="0" className='dashboard-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td onClick={() =>handleClickUser(item.name)} >{item.name}</td>
              <td onClick={() =>handleClickRole(item.role_id)}>{getValueByKey(item.role_id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div>
      <h2>Dockerfiles</h2>
      <table border="1" cellPadding="10" cellSpacing="0" className='dashboard-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Version</th>
            <th>Creator</th>
            <th>Repository</th>
          </tr>
        </thead>
        <tbody>

          {dockerfiles.map((item, index) => (
            <tr key={index}>
              <td onClick={() =>handleClickDockerfileName(item.id)}>{item.image_name}</td>
              <td onClick={() =>handleClickDockerfileName(item.id)}>{item.image_version}</td>
              <td>{getValueByKeyUser(item.creator_id)}</td>
              <td>
                <a href={item.repository}>
                  {item.repository}
                </a>
              </td>
            </tr>
          ))}
        
        </tbody>
      </table>
    </div>

    <div>
      <h2>Environment Variables</h2>
      <table border="1" cellPadding="10" cellSpacing="0" className='dashboard-table'>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {secret.map((item, index) => (
            <tr key={index}>
              <td onClick={() =>handleClickSecretKey(item.key)} >{item.key}</td>
              <td onClick={() =>handleClickSecretValue(item.value)}>
                <div className='text-container'>{item.value}</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div>
      <h2>Files</h2>
      <table border="1" cellPadding="10" cellSpacing="0" className='dashboard-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Target Service</th>
          </tr>
        </thead>
        <tbody>
          {dockerfileExist ? 
            dockerfiles.map((item, index) => (
              <tr key={index}>
                <td onClick={() =>handleClickFilename(item.name)} >{item.name}</td>
                <td onClick={() =>handleClickFileTarget(item.services)}>
                {item.services.map((svc) => (
                  <div>{svc}</div>
            ))}
                </td>
              </tr>
            ))
            : 
            ""
          }
        </tbody>
      </table>
    </div>

    <div>
      <h2>Connectivity</h2>
      <KialiStyleFlowChart onNamespace={namespace}/>
      <h2>Status</h2>
      <table border="1" cellPadding="10" cellSpacing="0" className='dashboard-table'>
        <thead>
          <tr>
            <th>Service</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Harbor</td>
            <td>Running</td>
          </tr>
          <tr>
            <td>ArgoCD</td>
            <td>Running</td>
          </tr>
          <tr>
            <td>PostgreSQL</td>
            <td>Running</td>
          </tr>
          <tr>
            <td>RBAC Manager</td>
            <td>Running</td>
          </tr>
          <tr>
            <td>Install Manager</td>
            <td>Running</td>
          </tr>
          <tr>
            <td>Deploy Manager</td>
            <td>Running</td>
          </tr>
          <tr>
            <td>Gateway</td>
            <td>Running</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>;
}

export default Project;