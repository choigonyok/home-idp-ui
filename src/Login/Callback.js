import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import Loading from '../Components/Loading';
import axios from 'axios';


const Callback = () => {
  const navigate = useNavigate();
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    if (code && state) {
      axios.get(url+'/github/callback?code='+code+"&state="+state)
      .then(response => {
        localStorage.setItem("jwt_token", response.data.token);
        navigate("/projects");
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
      });
    } else {
      navigate("/login");
    }
  },[])
  
  return
};

export default Callback;
