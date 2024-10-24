import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Table from './Table.css'

function ServiceTable({data}) {
  const [clickSelect, setClickSelect] = useState(false);
  const [checkedServices, setCheckedServices] = useState([]);

  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleSelect = () => {
    setClickSelect(!clickSelect);
  }

  const handleDelete = () => {
    const project_name = "idp-system"
    
    axios.delete(url+'/api/projects/'+project_name+'/resources/services?names='+checkedServices.join(","))
    .then(response => {
      setCheckedServices([]);
    })
    .catch(error => {
      console.error('Error fetching progress:', error);
    });
  }

  const handleCheckboxChange = (name) => {
    checkedServices.includes(name) ?
    setCheckedServices((prevState) => prevState.filter((svc) => svc !== name))
    :
    setCheckedServices((prevState) => [...prevState, name]);
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
          <th>Selector</th>
          <th>Age</th>
          <th>Port</th>
          <th>IP</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {clickSelect ? 
              <input
                type="checkbox"
                checked={checkedServices.includes(item.name) ? true : false}
                onChange={() => handleCheckboxChange(item.name)}
              />
              :
              <td>{index+1}</td>
            }
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>
              {Object.entries(item.selector).map(([key, value], i) => (
                  <div key={i}>
                    {key}: {value}
                    <br/>
                  </div>
                ))}  
            </td>
            <td>{item.age}</td>
            <td>
              {item.port.map((p, i) => (
                <div key={i}>{p}</div>
              ))}
            </td>
            <td>{item.ip}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}

export default ServiceTable;