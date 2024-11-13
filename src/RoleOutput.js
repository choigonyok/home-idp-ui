import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

function RoleOutput() {
  const [roleNames, setRoleNames] = useState([]);
  const navigate = useNavigate();

  // 처음에 /a 경로에 GET 요청을 보내서 이름 리스트를 받아옴
  useEffect(() => {
    axios.get('http://api-idp.choigonyok.com:8080/api/roles')
      .then(response => {
        setRoleNames(response.data);  // 데이터를 상태에 저장
      })
      .catch(error => {
        console.error('Error fetching names:', error);
      });
  }, []);

  // 이름 클릭 시 새로운 경로로 이동
  const handleNameClick = (name) => {
    navigate(`/details/${name}`);  // 새로운 경로로 이동
  };

  return (
    <div>
      <h1>Name List</h1>
      <ul>
        {roleNames.map((name, index) => (
          <li key={index}>
            <button onClick={() => handleNameClick(name.id)}>{name.id}</button>
            <button onClick={() => handleNameClick(name.name)}>{name.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoleOutput;
