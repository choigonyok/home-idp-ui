import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from './Select.css'

function Namespaces({onSelectNamespace}) {
  const [namespaces, setNamespaces] = useState([]);
  const [selectedNamespace, setSelectedNamespace] = useState("");
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleNamespace = (e) => {
    setSelectedNamespace(e.target.value);
    onSelectNamespace(e.target.value);
  }

  useEffect(() => {
    axios.get(url+'/api/projects')
      .then(response => {
        setNamespaces(response.data);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
      });
  }, [])

  return (
      <select class="harbor-select" value={selectedNamespace} onChange={handleNamespace}>
         <option value="" disabled>Select Project</option>
        {namespaces.map((item) => (
          <option value={item.name}>{item.name}</option>
        ))}
      </select>
  )
}

export default Namespaces;