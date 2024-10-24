import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from './Table.css'

function IngressTable({data}) {
  const [clickSelect, setClickSelect] = useState(false);
  const [checkedIngress, setCheckedIngress] = useState([]);

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
    
    axios.delete(url+'/api/projects/'+project_name+'/resources/ingresses?names='+checkedIngress.join(","))
    .then(response => {
      setCheckedIngress([]);
    })
    .catch(error => {
      console.error('Error fetching progress:', error);
    });
  }

  const handleCheckboxChange = (name) => {
    checkedIngress.includes(name) ?
    setCheckedIngress((prevState) => prevState.filter((ingress) => ingress !== name))
    :
    setCheckedIngress((prevState) => [...prevState, name]);
  };

  const handleClickIngress = (item) => {
    const data = {
      name: item.name,
      rules: item.rules,
    }; 
    navigate('/resources/ingresses/'+item.name, { state: data });
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
            <th>Age</th>
            <th>Host</th>
            <th>Path</th>
            <th>Service</th>
            <th>Port</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {clickSelect ? 
                <input
                  type="checkbox"
                  checked={checkedIngress.includes(item.name) ? true : false}
                  onChange={() => handleCheckboxChange(item.name)}
                />
                :
                <td>{index+1}</td>
              }
              <td onClick={() => handleClickIngress(item)}>{item.name}</td>
              <td>{item.age}</td>
              <td>
                {item.rules.map((r, i) => (
                    <div key={i}>{r.host}</div>
                ))}
              </td>
              <td>
                {item.rules.map((r, i) => (
                    <div key={i}>{r.path}</div>
                ))}
              </td>
              <td>
                {item.rules.map((r, i) => (
                    <div key={i}>{r.service}</div>
                ))}
              </td>
              <td>
                {item.rules.map((r, i) => (
                    <div key={i}>{r.port}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IngressTable;