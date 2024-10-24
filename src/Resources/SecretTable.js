import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Table from './Table.css'

function SecretTable({data}) {
  const [clickSelect, setClickSelect] = useState(false);
  const [clickCheck, setClickCheck] = useState([]);
  const [checkedSecrets, setCheckedSecrets] = useState([]);

  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleSelect = () => {
    setClickSelect(!clickSelect);
  }

  const handleDelete = () => {
    const project_name = "idp-system"
    
    axios.delete(url+'/api/projects/'+project_name+'/resources/secrets?names='+checkedSecrets.join(","))
    .then(response => {
      setCheckedSecrets([]);
    })
    .catch(error => {
      console.error('Error fetching progress:', error);
    });
  }

  const handleCheckboxChange = (name) => {
    checkedSecrets.includes(name) ?
    setCheckedSecrets((prevState) => prevState.filter((secret) => secret !== name))
    :
    setCheckedSecrets((prevState) => [...prevState, name]);
  };

  return (
    <div>
      <div>
        <br/>
        <button className='btn' onClick={handleSelect}>Select</button>
      </div>

      {
        clickSelect ?
          <div>
            <br/>
            <button className='btn' onClick={handleDelete}>Delete</button>
          </div>
        :
          ""
      }    
      <br/>
      <table border="1" cellPadding="10" cellSpacing="0" className='dashboard-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Data</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {clickSelect ? 
              <input
              type="checkbox"
              checked={checkedSecrets.includes(item.name) ? true : false}
              onChange={() => handleCheckboxChange(item.name)}
              />
            :
              <td>{index+1}</td>
            } 
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.data}</td>
            <td>{item.age}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}

export default SecretTable;