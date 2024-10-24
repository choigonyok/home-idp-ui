import React, { useState, useEffect  } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Table from './Table.css';

function Configmap() {
  const location = useLocation();
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  const { name } = location.state || {}; 
  const [tableData, setTableData] = useState({
    name: name,
    datas: [],
  });

  const handleInputChange = (e, field, index) => {
    var tmp = {...tableData}
    tmp.name = (field === "name" ? e.target.value : test.name)
    tmp.datas[index].key = (field === "datas" ? e.target.value : test.datas[index].key)
  };

  useEffect(() => {
    const project_name = "idp-system"
    axios.get(url+'/api/projects/'+project_name+'/resources/configmaps/'+name)
      .then(response => {
        setTableData({datas: response.data});
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
      });
    }, [])

  return  (
    <div>
      <h1>Input Table</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr className='row'>
            <th>Name</th>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
            <tr className='row'>
              <td>
                <input
                  type="text"
                  name="name"
                  value={tableData.name}
                  onChange={(e) => handleInputChange(e, "name", 0)}
                  placeholder="Enter Name"
                />
              </td>
              <td className='keybox'>
                {tableData.datas.map((item, index)=>(
                  <div className='key'>
                    {item.key}
                  </div>
                ))}
              </td>
              <td className='keybox'>
                {tableData.datas.map((item, index)=>(
                        <textarea
                        value={item.value}
                        onChange={(e) => handleInputChange(e, "datas", index)}
                        rows={2}  // 원하는 줄 수
                        cols={50} // 원하는 너비
                        placeholder="Enter Host"
                      />
                ))}
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Configmap;