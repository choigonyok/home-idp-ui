import React from 'react';
import { useNavigate } from 'react-router-dom';

function IngressTable({data}) {
  const navigate = useNavigate();

  const handleClickIngress = (item) => {
    const data = {
      name: item.name,
      rules: item.rules,
    }; 
    navigate('/resources/ingresses/'+item.name, { state: data });
  }

  return <table border="1" cellPadding="10" cellSpacing="0">
  <thead>
    <tr>
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
}

export default IngressTable;