import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Popup.css';
import Popup from './Popup';
import Button from '../Components/Button';
import ProjectTable from './ProjectTable';
import ProjectPopup from './ProjectPopup';
import Loading from '../Components/Loading';
import Forbidden from '../Components/Forbidden';

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function ProjectList() {
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const [namespaces, setNamespaces] = useState([]);
  const [addProjectPopup, setAddProjectPopup] = useState(false);  
  const [forbidden, setForbidden] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleAddProjectPopup = () => {
    setAddProjectPopup(!addProjectPopup);
  };

  const handleSaveProjectPopup = async (event) => {
    event.preventDefault(); 

    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }

    setIsLoading(true)

    axios.post(url+'/api/project', JSON.stringify(project), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
        setIsLoading(true)
      });
  };

  useEffect(()=>{
    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }

    axios.get(url+'/api/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setNamespaces(response.data);
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        if (error.response.status === 403) {
          setForbidden("You don't have proper permission to access.\nPlease contact with your administrator.")
        } else if (error.response.status === 401) {
          alert("You are not logged in!")
          navigate("/login")
        }
        console.error('Error fetching progress:', error);
        setIsLoading(false)
      });
  },[])

  const projectTable = [
    { Header: 'Name', accessor: 'name' },
  ];


  const handleClickProject = (path) => {
    navigate(path.name);
  };


  
  return <div>
    {forbidden === "" ?
      !isLoading ?
      <div>
        <div style={{fontSize: '45px', fontWeight: "700", marginLeft: '10px', marginTop: '20px', marginBottom: '30px'}}>Projects</div>
        <Button onClick={handleAddProjectPopup} label={"Add Project"} disabled={false} />
        {namespaces !== undefined ?
          <ProjectTable data={namespaces} columns={projectTable} onClick={handleClickProject}/>
        : <Loading/> }
        {addProjectPopup?
            <Popup onSave={handleSaveProjectPopup} onClose={handleAddProjectPopup} title={"Add Project"} children={<ProjectPopup onProjectChange={setProject}/>}/>
            :
            ""
          }
        </div>
      : <Loading/>
      : <Forbidden message={forbidden}/>}
  </div>;
}

export default ProjectList;