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
import { useNavigate, useLocation } from 'react-router-dom';
import UserTable from './Tables/UserTable';
import EnvVarTable from './Tables/EnvVarTable';
import FileTable from './Tables/FileTable';
import Button from '../Components/Button';
import Loading from '../Components/Loading';


function Project() {
  const { namespace } = useParams();
  const navigate = useNavigate();
  const location = useLocation();


  const [data, setData] = useState([]);
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  
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
  const [file, setFile] = useState({});
  const [envVars, setEnvVars] = useState([]);
  const [envVar, setEnvVar] = useState({});
  const [dockerfile, setDockerfile] = useState([]);
  const [user, setUser] = useState({});
  const [trace, setTrace] = useState([]);
  const [userData, setUserData] = useState([]);
  const [fileData, setFileData] = useState([]);
  
  
  useEffect(() => {
    setUserData(users.map((item) => ({
      name: item.name,
      role: getValueByKey(item.role_id),
    })))
  },[role])
  
  useEffect(() => {
    if (dockerfiles.length !== 0) setDockerfileExist(true);
  }, [dockerfiles])


  const handleClickDockerfileName = (name) => {
    setClickDockerfileName(name)

    axios.get(url+'/api/projects/'+namespace+'/dockerfiles/'+name+'/trace')
    .then(response => {
      setTrace(response.data);
    })
    .catch(error => {
      console.error('Error fetching progress:', error);
    });
    
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
        setDockerfiles(response.data.map((item) => ({
          image_name: item.image_name,
          image_version: item.image_version,
          creator_id: getValueByKeyUser(item.creator_id),
          repository: item.repository,
        })))
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
    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }
    
    axios.get(url+'/api/projects/'+namespace+'/users')
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      console.error('Error fetching progress:', error);
    });
    
    axios.get(url+'/api/projects/'+namespace+'/secrets', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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

      setFileData(tmp.flatMap((item) => (
        item.files.map((file) => ({
          name: file.name,
          target_service: fromArrayToString(file.mount_services),
          configmap: item.name,
          creator: item.creator,
        }))
      )))
    })
    .catch(error => {
      console.error('Error fetching progress:', error);
    });
  }, [])


  const handleDockerfileSave = async (event) => {
    event.preventDefault(); 
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

    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }
    axios.post(url+'/api/projects/'+location.pathname.split("/")[2]+'/dockerfile', JSON.stringify(bodyData), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        navigate('/traces/'+id);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
      });
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

    window.location.reload();
  };

  const handleFileSave = async (event) => {
    event.preventDefault(); 

    const jsonBody = {
      filename: file.filename,
      fileContent: file.fileContent,
    }
    
    try {
      const response = await fetch(url+"/api/projects/"+namespace+"/configmap", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
      });
    } catch (error) {
      console.error('Error sending request:', error);
    }

    window.location.reload();
  };

  const handleUserSave = async (event) => {
    event.preventDefault(); 

    const jsonBody = {
      name: user.username,
      email: user.email,
      role_id: user.role_id
    }

    try {
      const response = await fetch(url+"/api/projects/"+namespace+"/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
      });
    } catch (error) {
      console.error('Error sending request:', error);
    }
    window.location.reload();
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

  const userTable = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Role', accessor: 'role' },
  ];
  const envVarTable = [
    { Header: 'Key', accessor: 'key' },
    { Header: 'Value', accessor: 'value' },
    { Header: 'Secret', accessor: 'secret' },
    { Header: 'Creator', accessor: 'creator' },
  ];
  const fileTable = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Target Service', accessor: 'target_service' },
    { Header: 'ConfigMap', accessor: 'configmap' },
    { Header: 'Creator', accessor: 'creator' },
  ];
  const dockerfileTable = [
    { Header: 'Name', accessor: 'image_name' },
    { Header: 'Tag', accessor: 'image_version' },
    { Header: 'Creator', accessor: 'creator_id' },
    { Header: 'Repository', accessor: 'repository' },
  ];

  console.log(secret)

  return <div>
    {userData !== undefined && secret !== undefined && fileData !== undefined ?
      <div>    
        <div style={{fontSize: '45px', fontWeight: "700", marginLeft: '10px', marginTop: '20px', marginBottom: '30px'}}>{namespace}</div>
        <div style={{display: "flex", gap: '10px', flexDirection: 'column'}}>
          <div style={{display: "flex", alignItems: 'center'}}>
            <h2>Users</h2>
            <Button onClick={handleOpenUserPopup} label={"Add User"} disabled={false} />
          </div>
          <UserTable data={userData} columns={userTable}/>

          <div style={{display: "flex", alignItems: 'center'}}>
            <h2>Dockerfiles</h2>
            <Button onClick={handleOpenDockerfilePopup} label={"Add Dockerfile"} disabled={false} />
          </div>
          <EnvVarTable data={dockerfiles} columns={dockerfileTable}/>

          <div style={{display: "flex", alignItems: 'center'}}>
            <h2>Environment Variables</h2>
            <Button onClick={handleOpenEnvVarPopup} label={"Add Environment Variable"} disabled={false} />
          </div>
          <EnvVarTable data={secret} columns={envVarTable}/>
          
          <div style={{display: "flex", alignItems: 'center'}}>
            <h2>Files</h2>
            <Button onClick={handleOpenFilePopup} label={"Add File"} disabled={false} />
          </div>
          <FileTable data={fileData} columns={fileTable}/>
        </div>

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
          <Popup 
            onSave={handleFileSave}
            onClose={handleOpenFilePopup}
            title={"Add File"} 
            children={<FileInput onFileChange={setFile} onClose={handleOpenFilePopup}/>}/>
          :
          ""
        }
        {openUserPopup?
          <Popup 
            onSave={handleUserSave}
            onClose={handleOpenUserPopup}
            title={"Add User"}  
            children={<UserInput onUserChange={setUser} onClose={handleOpenUserPopup}/>}/>
          :
          ""
        }
        <h2>Connectivity</h2>
        <KialiStyleFlowChart onNamespace={namespace} className={openDockerfilePopup?"overlay":""}/>
        </div>
        : <Loading/> }
  </div>;
}

export default Project;