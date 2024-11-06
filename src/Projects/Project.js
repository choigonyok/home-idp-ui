import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Namespaces from '../Resources/Namespaces';
import './Popup.css';
import KialiStyleFlowChart from './KialiStyleFlowChart';
import Popup from './Popup';
import DockerfileInput from './DockerfileInput';
import EnvInput from './EnvInput';
import EnvSearch from './EnvSearch';
import FileInput from './FileInput';
import FileSearch from './FileSearch';
import UserInput from './UserInput';
import { v4 as uuidv4 } from 'uuid';


function Project() {
  const { namespace } = useParams();

  const [data, setData] = useState([]);
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  
  const [clickUser, setClickUser] = useState("");
  const [clickRole, setClickRole] = useState("");
  const [clickSecretKey, setClickSecretKey] = useState("");
  const [clickSecretValue, setClickSecretValue] = useState("");
  const [clickFileTarget, setClickFileTarget] = useState([]);
  const [clickFileName, setClickFileName] = useState("");
  const [clickDockerfileName, setClickDockerfileName] = useState("");
  const [openDockerfilePopup, setOpenDockerfilePopup] = useState(false);
  const [openEnvVarPopup, setOpenEnvVarPopup] = useState(false);
  const [openFilePopup, setOpenFilePopup] = useState(false);
  const [openUserPopup, setOpenUserPopup] = useState(false);
    
  const [users, setUsers] = useState([]);
  const [dockerfiles, setDockerfiles] = useState([]);
  const [dockerfileExist, setDockerfileExist] = useState(false);
  const [role, setRole] = useState(new Map());
  const [userIdName, setUserIdName] = useState(new Map());
  const [secret, setSecret] = useState([]);
  const [configmap, setConfigmap] = useState([]);
  const [configmapServices, setConfigmapServices] = useState(new Map());


  const [files, setFiles] = useState([]);
  const [envVars, setEnvVars] = useState([]);
  const [envVar, setEnvVar] = useState({});
  const [dockerfile, setDockerfile] = useState([]);


  useEffect(() => {
    if (dockerfiles.length !== 0) setDockerfileExist(true);
  }, [dockerfiles])


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
    if (users === null) {
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
      const tmp = [...configmap]
      response.data.map((cm)=> {
        const files = []
        cm.files.map((f)=> {
          var services = ""
          if  (f.mount_services.length !== 0) {
            services = Array.from(f.mount_services).join(", ")
          }
          const file = {"name": f.name, "mount_services": services, "content": f.content}
          files.push(file)
        })
                
        if (configmap.findIndex((item) => item.name === cm.name) !== -1 ) {
          tmp[configmap.findIndex((item) => item.name === cm.name)] = {
            "name": cm.name, 
            "creator": cm.creator,
            "files": files,
          }
        }
        tmp.push({
          "name": cm.name, 
          "creator": cm.creator,
          "files": files,
        })
      })
      setConfigmap(tmp)
    })
    .catch(error => {
      console.error('Error fetching progress:', error);
    });
  }, [])

  const handleDockerfileSave = async (event) => {
    const id = uuidv4();
    event.preventDefault();
    const bodyData = {
      image_name: dockerfile.image_name,
      image_version: dockerfile.image_version,
      repository: dockerfile.repository,
      content: dockerfile.content,
      trace_id: id,
      envs: envVars,
      files: files,
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

    setOpenDockerfilePopup(false)
  };

  const handleEnvVarSave = async (event) => {
    event.preventDefault(); 

    const jsonBody = [{
      key: envVar.key,
      value: envVar.value,
    }]
    
    try {
      const response = await fetch(url+"/api/projects/"+namespace+"/secret", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
      });
    } catch (error) {
      console.error('Error sending request:', error);
    }

    setOpenEnvVarPopup(false)
  };


  const handleOpenDockerfilePopup = () => {
    setOpenDockerfilePopup(!openDockerfilePopup);
  };

  const handleOpenEnvVarPopup = () => {
    setOpenEnvVarPopup(!openEnvVarPopup);
  };

  const handleOpenFilePopup = () => {
    setOpenFilePopup(!openFilePopup);
  };

  const handleOpenUserPopup = () => {
    setOpenUserPopup(!openUserPopup);
  };

  const fromArrayToString = (array) => {
    if (array !== "") {
      return array
    }
    return "-"
  };
  
  return <div>
    <h1>{namespace}</h1>
    <div>
      <h2>
        Users
        <button className='btn' onClick={handleOpenUserPopup}>Add User</button>
      </h2>
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
      <h2>
        Dockerfiles
        <button className='btn' onClick={handleOpenDockerfilePopup}>Add Dockerfile</button>
      </h2>
      
      {openDockerfilePopup?
        <Popup 
          onSave={handleDockerfileSave} 
          onClose={handleOpenDockerfilePopup}
          title={"Add Dockerfile"} 
          children={<DockerfileInput onDockerfileChange={setDockerfile}/>} 
          title2={"Attach Environment Variables"} 
          children2={<EnvSearch onEnvVarChange={setEnvVars} suggestions={secret}/>}
          title3={"Attach Files"} 
          children3={<FileSearch onFileChange={setFiles} suggestions={configmap}/>}
        />
        :
        ""
      }

      {openEnvVarPopup?
        <Popup 
          onSave={handleEnvVarSave}
          onClose={handleOpenEnvVarPopup}
          title={"Add Environment Variable"} 
          children={<EnvInput onEnvVarChange={setEnvVar}/>}/>
        :
        ""
      }
      {openFilePopup?
        <Popup title={"Add File"} children={<FileInput onNamespace={namespace} onClose={handleOpenFilePopup}/>}/>
        :
        ""
      }
      {openUserPopup?
        <Popup title={"Add User"} children={<UserInput onNamespace={namespace} onClose={handleOpenUserPopup}/>}/>
        :
        ""
      }

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
      <h2>
        Environment Variables
        <button className='btn' onClick={handleOpenEnvVarPopup}>Add Environment Variable</button>
      </h2>
      <table border="1" cellPadding="10" cellSpacing="0" className='dashboard-table'>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Secret</th>
            <th>Creator</th>
          </tr>
        </thead>
        <tbody>
          {secret.map((item, index) => (
            <tr key={index}>
              <td onClick={() =>handleClickSecretKey(item.key)} >{item.key}</td>
              <td onClick={() =>handleClickSecretValue(item.value)}>{item.value}</td>
              <td>{item.secret}</td>
              <td>{item.creator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div>
      <h2>
        Files
        <button className='btn' onClick={handleOpenFilePopup}>Add File</button>
      </h2>
      <table border="1" cellPadding="10" cellSpacing="0" className='dashboard-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Target Service</th>
            <th>ConfigMap</th>
            <th>Creator</th>
          </tr>
        </thead>
        <tbody>
          {configmap.map((cm) => (
              cm.files.map((file, index) => (
              <tr key={index}>
                  <td>{file.name}</td>
                  <td>{fromArrayToString(file.mount_services)}</td>
                  <td>{cm.name}</td>
                  <td>{cm.creator}</td>
                </tr>
              ))
          ))}
        </tbody>
      </table>
    </div>  
    <h2>Connectivity</h2>
    <KialiStyleFlowChart onNamespace={namespace} className={openDockerfilePopup?"overlay":""}/>
  </div>;
}

export default Project;