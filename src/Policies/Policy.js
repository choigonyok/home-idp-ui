import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Policy({}) {
  const { policy_id } = useParams();
  const [policy, setPolicy] = useState([]);

  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  

  useEffect(() => {
    axios.get(url+'/api/policies/'+"4282329e-8917-4e28-851d-6b56b9a52947")
      .then(response => {
        setPolicy(response.data);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
      });
  }, [])

  return (
    <div>
      <div>
        {policy.id}
      </div>
      <div>
        {policy.name}
      </div>
      <div>
        {policy.json}
      </div>
    </div>
  );
}

export default Policy;

