import React from 'react';
import { useNavigate } from 'react-router-dom';

function ConfigmapTable({data}) {
  const navigate = useNavigate();
  
    const handleClickConfigmap = (item) => {
      const data = {
        name: item.name,
      }; 
      navigate('/resources/configmaps/'+item.name, { state: data });
    }

  return <table border="1" cellPadding="10" cellSpacing="0">
  <thead>
    <tr>
      <th>Name</th>
      <th>Data</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, index) => (
      <tr key={index}>
        <td onClick={() => handleClickConfigmap(item)}>{item.name}</td>
        <td>{item.data}</td>
        <td>{item.age}</td>
      </tr>
    ))}
  </tbody>
  </table>
}

export default ConfigmapTable;