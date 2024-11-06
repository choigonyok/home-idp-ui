import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
import ProjectPopup from './ProjectPopup';

function ProjectList() {
  const [data, setData] = useState([]);
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const [namespaces, setNamespaces] = useState([]);
  const [addProjectPopup, setAddProjectPopup] = useState(false);  

  const handleAddProjectPopup = () => {
    setAddProjectPopup(!addProjectPopup);
  };

  useEffect(() => {
    axios.get(url+'/api/projects')
      .then(response => {
        setNamespaces(response.data);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
      });
  }, [])
  
  return <div>
    <h1>
      Project Page
      <button className='btn' onClick={handleAddProjectPopup}>Add Project</button>  
    </h1>
    <table border="1" cellPadding="10" cellSpacing="0" className='dashboard-table'>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
      {namespaces ? namespaces.map((item, index) => (
        <tr key={index}>
          <td>
            <Link to={"/projects/"+item.name}>{item.name}</Link>
          </td>
        </tr>
      )): ""}
      </tbody>
    </table>

    {addProjectPopup?
        <Popup title={"Add Project"} children={<ProjectPopup onClose={handleAddProjectPopup}/>}/>
        :
        ""
      }
  </div>;
}

export default ProjectList;