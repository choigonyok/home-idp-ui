import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Ingress() {
  const location = useLocation();
  const { name, rules } = location.state || {}; 
  const [tableData, setTableData] = useState({
    name: name,
    rules: rules,
  });

  const handleInputChange = (e, field, index) => {
    var test = {...tableData}
    test.name = (field === "name" ? e.target.value : test.name)
    test.rules[index].host = (field === "host" ? e.target.value : test.rules[index].host)
    test.rules[index].path = (field === "path" ? e.target.value : test.rules[index].path)
    test.rules[index].service = (field === "service" ? e.target.value : test.rules[index].service)
    test.rules[index].port = (field === "port" ? e.target.value : test.rules[index].port)
    setTableData(test);
  };

  return  (
    <div>
      <h1>Input Table</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Host</th>
            <th>Path</th>
            <th>Service</th>
            <th>Port</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="name"
                  value={tableData.name}
                  onChange={(e) => handleInputChange(e, "name", 0)}
                  placeholder="Enter Name"
                />
              </td>
              <td>
                {rules.map((item, index)=>(
                  <div>
                    <td>
                      <input
                        type="text"
                        name="host"
                        value={item.host}
                        onChange={(e) => handleInputChange(e, "host", index)}
                        placeholder="Enter Host"
                      />
                    </td>
                  </div>
                ))}
              </td>
              <td>
                {rules.map((item, index)=>(
                  <div>
                    <td>
                      <input
                        type="text"
                        name="path"
                        value={item.path}
                        onChange={(e) => handleInputChange(e, "path", index)}
                        placeholder="Enter Host"
                      />
                    </td>
                  </div>
                ))}
              </td>  
              <td>
                {rules.map((item, index)=>(
                  <div>
                    <td>
                      <input
                        type="text"
                        name="service"
                        value={item.service}
                        onChange={(e) => handleInputChange(e, "service", index)}
                        placeholder="Enter Service"
                      />
                    </td>
                  </div>
                ))}
              </td>  
              <td>
                {rules.map((item, index)=>(
                  <div>
                    <td>
                      <input
                        type="text"
                        name="port"
                        value={item.port}
                        onChange={(e) => handleInputChange(e, "port", index)}
                        placeholder="Enter Port"
                      />
                    </td>
                  </div>
                ))}
              </td>  
            </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Ingress;