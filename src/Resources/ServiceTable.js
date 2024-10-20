import React, { useState, useEffect } from 'react';

function ServiceTable({data}) {
  return <table border="1" cellPadding="10" cellSpacing="0">
  <thead>
    <tr>
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
}

export default ServiceTable;