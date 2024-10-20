import React, { useState, useEffect } from 'react';

function SecretTable({data}) {
  return <table border="1" cellPadding="10" cellSpacing="0">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Data</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, index) => (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>{item.data}</td>
        <td>{item.age}</td>
      </tr>
    ))}
  </tbody>
  </table>
}

export default SecretTable;