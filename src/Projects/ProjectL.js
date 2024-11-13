import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Namespaces from '../Resources/Namespaces';
import Box from './Box.css';
import { v4 as uuidv4 } from 'uuid';
import DockerfileInput from './DockerfileInput';
import Popup from './Popup';

function ProjectL() {
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');

  const [roles, setRoles] = useState([]);
  const [rolename, setRolename] = useState('');

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [roleId, setRoleId] = useState('');
  const [projectName, setProjectName] = useState('');

  const [imageName, setImageName] = useState('');
  const [imageVersion, setImageVersion] = useState('');
  const [repo, setRepo] = useState('');
  const [content, setContent] = useState('');
  const [clickUser, setClickUser] = useState('');
  const [dockerfiles, setDockerfiles] = useState([]);

  const [podname, setPodName] = useState('');
  const [podnamespace, setPodNamespace] = useState('');
  const [podimage, setPodImage] = useState('');
  const [podport, setPodPort] = useState('');

  const [traceId, setTraceId] = useState('');
  const [openDockerfilePopup, setOpenDockerfilePopup] = useState(false);
  
  
  

  useEffect(() => {
    axios.get(url+'/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
    });

    const now = new Date().toISOString()
    const id = uuidv4();

    console.log("ID:"+id);
    axios.get(url+'/api/roles', {
      headers: {
        'x-trace-id': id,
        'x-request-time': now+"-UI"
      }
    })
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
    });
  }, [])

  useEffect(() => {
    if (clickUser === "") {
      return;    
    }
    axios.get(url+'/api/users/'+clickUser+'/dockerfiles')
      .then(response => {
        console.log(response.data)
        setDockerfiles(response.data);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
    });
  }, [clickUser])

  useEffect(() => {
    if (projectName === "") {
      return;    
    }
    axios.get(url+'/api/projects/'+projectName+'/users')
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
    });
  }, [projectName])


  const handleSubmit = async (event) => {
    event.preventDefault();
    const bodyData = {
      name: name
    };
    
    try {
      const response = await fetch(url+"/api/project", {
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
  };

  const handleRoleSubmit = async (event) => {
    event.preventDefault();
    const bodyData = {
      name: rolename
    };
    
    try {
      const response = await fetch(url+"/api/role", {
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
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    const bodyData = {
      role_id: roleId,
      name: username
    };

    try {
      const response = await fetch(url+"/api/projects/"+projectName+"/user", {
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
  };

  const handleDockerfileSubmit = async (event) => {
    const id = uuidv4();
    event.preventDefault();
    const bodyData = {
      image_name: imageName,
      image_version: imageVersion,
      repository: repo,
      content: content,
      trace_id: id,
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

    setTraceId(id);
  };

  const handlePodSubmit = async (event) => {
    event.preventDefault();
    const bodyData = {
      name: podname,
      namespace: podnamespace,
      image: podimage,
      container_port: podport,
    };

    try {
      const response = await fetch(url+"/api/pod", {
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
  };
  
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRolename(e.target.value);
  };

  const handleUserChange = (e) => {
    setUsername(e.target.value);
  };

  const handleDockerfileImageNameChange = (e) => {
    setImageName(e.target.value);
  };
  const handleDockerfileImageVersionChange = (e) => {
    setImageVersion(e.target.value);
  };
  const handleDockerfileRepoChange = (e) => {
    setRepo(e.target.value);
  };
  const handleDockerfileContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePodName = (e) => {
    setPodName(e.target.value);
  };
  const handlePodNamespace = (e) => {
    setPodNamespace(e.target.value);
  };
  const handlePodImage = (e) => {
    setPodImage(e.target.value);
  };
  const handlePodPort = (e) => {
    setPodPort(e.target.value);
  };

  const handleRoleId = (id) => {
    setRoleId(id);
  };

  const handleProjectName = (name) => {
    setProjectName(name);
  };

  const handleClickUser = (name) => {
    setClickUser(name);
  };

  const handleOpenDockerfilePopup = () => {
    setOpenDockerfilePopup(!openDockerfilePopup);
  };
  

  return <div>
    {projects !== null ? 
      projects.map((item)=> (
        <div>
          <div>{item.id}</div>
          <div onClick={()=>handleProjectName(item.name)}>{item.name}</div>
          <div>{item.creator_id}</div>
          <br/>
        </div>
      ))
      :
      ""
    }
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">TESTNAME</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleChange}
        placeholder="이름 입력"
      />
      <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>Submit</button>
    </form>

    {roles !== null ? 
      roles.map((item)=> (
        <div>
          <div>{item.id}</div>
          <div onClick={()=>handleRoleId(item.id)}>{item.name}</div>
          <div>{item.create_time}</div>
          <br/>
        </div>
      ))
      :
      ""
    }
    <form onSubmit={handleRoleSubmit}>
      <label htmlFor="rolename">rolename</label>
      <input
        type="text"
        id="rolename"
        value={rolename}
        onChange={handleRoleChange}
        placeholder="이름 입력"
      />
      <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>Submit</button>
    </form>

    <br/>

    {users !== null ? 
      users.map((item)=> (
        <div>
          <div>{item.id}</div>
          <div onClick={() => handleClickUser(item.name)}>{item.name}</div>
          <div>{item.role_id}</div>
          <div>{item.create_time}</div>
          <br/>
        </div>
      ))
      :
      ""
    }

    <form onSubmit={handleUserSubmit}>
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={handleUserChange}
        placeholder="이름 입력"
      />
      <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>Submit</button>
    </form>

    {dockerfiles !== null ? 
      dockerfiles.map((item)=> (
        <div>
          <div>{item.id}</div>
          <div>{item.image_name}</div>
          <div>{item.image_version}</div>
          <div>{item.creator_id}</div>
          <div>{item.repository}</div>
          <div>{item.content}</div>
          <br/>
        </div>
      ))
      :
      ""
    }

    <button className='btn' onClick={handleOpenDockerfilePopup}>New Dockerfile</button>
    {openDockerfilePopup?
      <Popup handleClose={handleOpenDockerfilePopup} component={<DockerfileInput/>}/>
      :
      ""
    }

    <form onSubmit={handlePodSubmit}>
      <label htmlFor="pod">pod</label>
      <input
        type="text"
        id="podname"
        value={podname}
        onChange={handlePodName}
        placeholder="podname 입력"
      />

      <input
        type="text"
        id="podnamespace"
        value={podnamespace}
        onChange={handlePodNamespace}
        placeholder="podnamespace 입력"
      />

      <input
        type="text"
        id="podimage"
        value={podimage}
        onChange={handlePodImage}
        placeholder="podimage 입력"
      />

      <input
        type="text"
        id="podport"
        value={podport}
        onChange={handlePodPort}
        placeholder="podport 입력"
      />
      
      <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>Submit</button>
    </form>

    <a href={"http://api-idp.choigonyok.com:8080/login"}>{"http://api-idp.choigonyok.com/login"}</a>

  </div>;
}

export default ProjectL;