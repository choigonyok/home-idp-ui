import React, { useState, useEffect } from 'react';

function PodTable({data}) {
  return <table border="1" cellPadding="10" cellSpacing="0">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Age</th>
      <th>IP</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, index) => (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.status}</td>
        <td>{item.age}</td>
        <td>{item.ip}</td>
      </tr>
    ))}
  </tbody>
  </table>
}

export default PodTable;