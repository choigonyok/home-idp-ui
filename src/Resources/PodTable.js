import axios from 'axios';
import React, { useState } from 'react';

function PodTable({data}) {
  const [clickSelect, setClickSelect] = useState(false);
  const [checkedPods, setCheckedPods] = useState([]);
  
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  
  const handleSelect = () => {
    setClickSelect(!clickSelect);
  }

  const handleDelete = () => {
    const project_name = "idp-system"
    axios.delete(url+'/api/projects/'+project_name+'/resources/pods?names='+checkedPods.join(","), null)
    .then(response => {
      setCheckedPods([]);
    })
    .catch(error => {
      console.error('Error fetching progress:', error);
    });
  }

  const handleCheckboxChange = (name) => {
    checkedPods.includes(name) ?
    setCheckedPods((prevState) => prevState.filter((pod) => pod !== name))
    :
    setCheckedPods((prevState) => [...prevState, name]);
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
          <th>Status</th>
          <th>Age</th>
          <th>IP</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {clickSelect ? 
              <input
                type="checkbox"
                checked={checkedPods.includes(item.name) ? true : false}
                onChange={() => handleCheckboxChange(item.name)}
              />
            :
              <td>{index+1}</td>
            }
            <td>{item.name}</td>
            <td>{item.status}</td>
            <td>{item.age}</td>
            <td>{item.ip}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}

export default PodTable;