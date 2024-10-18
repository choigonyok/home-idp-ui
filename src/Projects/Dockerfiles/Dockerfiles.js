import React, { useEffect, useState } from 'react';
import Popup from "../Popup";

function Dockerfiles() {
  const [data, setData] = useState([]);
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  const [dockerfileOpen, setDockerfileOpen] = useState(false);

  useEffect(() => {
    fetch(url + '/api/dockerfiles')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const openDockerfile = () => {
    setDockerfileOpen(!dockerfileOpen);
  };

  return (
    <div>
      <h1>Dockerfiles</h1>
      <button onClick={() => openDockerfile()}>
        New Dockerfile
      </button>
      {dockerfileOpen? 
      <Popup handleClose={openDockerfile}/>
      :  
      ""
      }
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          -----
          <h2>{key}</h2>
          {Object.entries(value).map(([subKey, subValue]) => (
            <div subKey={subKey}>
              <h2>{subKey}</h2> {subValue}
            </div>
          ))}
        </div>
      ))}
    </div>  
  );
}

export default Dockerfiles;
