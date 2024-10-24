import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from './Table.css'

function ConfigmapTable({data}) {
  const [clickSelect, setClickSelect] = useState(false);
  const [checkedConfigmaps, setCheckedConfigmaps] = useState([]);
  
  const navigate = useNavigate();
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleSelect = () => {
    setClickSelect(!clickSelect);
  }

  const handleDelete = () => {
    const project_name = "idp-system"
    
    axios.delete(url+'/api/projects/'+project_name+'/resources/configmaps?names='+checkedConfigmaps.join(","), null)
    .then(response => {
      setCheckedConfigmaps([]);
    })
    .catch(error => {
      console.error('Error fetching progress:', error);
    });
  }

  const handleCheckboxChange = (name) => {
    checkedConfigmaps.includes(name) ?
    setCheckedConfigmaps((prevState) => prevState.filter((cm) => cm !== name))
    :
    setCheckedConfigmaps((prevState) => [...prevState, name]);
  };

  const handleClickConfigmap = (item) => {
    const data = {
      name: item.name,
    }; 
    navigate('/resources/configmaps/'+item.name, { state: data });
  }

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
                checked={checkedConfigmaps.includes(item.name) ? true : false}
                onChange={() => handleCheckboxChange(item.name)}
              />
              :
              <td>{index+1}</td>
            }
            <td onClick={() => handleClickConfigmap(item)}>{item.name}</td>
            <td>{item.data}</td>
            <td>{item.age}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}

export default ConfigmapTable;