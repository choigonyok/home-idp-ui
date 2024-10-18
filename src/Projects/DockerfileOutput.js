import React, { useEffect, useState } from 'react';

function DockerfileOutput() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('http://api-idp.choigonyok.com:8080/api/dockerfiles')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  

  // 데이터가 비어 있으면 로딩 메시지 출력
  if (!data || Object.keys(data).length === 0) {
    return <div>Loading...</div>;
  }

  // 테이블 행을 생성하는 함수
  const renderTableRows = () => {
    const rows = [];
    Object.keys(data).forEach((user) => {
      Object.keys(data[user]).forEach((dockerfile) => {
        rows.push(
          <tr key={user + dockerfile}>
            <td>{user}</td>
            <td>{dockerfile}</td>
            <td>{data[user][dockerfile]}</td>
          </tr>
        );
      });
    });
    return rows;
  };

  return (
    <div>
      <h1>JSON Data Table</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Dockerfile</th>
            <th>Command</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
}

export default DockerfileOutput;
