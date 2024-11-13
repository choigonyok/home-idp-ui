import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../Projects/Input';
import RoleSelect from './RoleSelect';
import ItemBox from '../Components/ItemBox';
import { useNavigate } from 'react-router-dom';

function RolePopup({onRoleChange, role, defaultPolicies}) {
  const navigate = useNavigate();
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [roleName, setRoleName] = useState('');
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  const [tmp, setTmp] = useState(new Map());

  const handleRoleNameChange = (value) => {
    onRoleChange({"role": {"name": value, "id": role.role.id}, "policies": selectedPolicies})
    setRoleName(value);
  };

  useEffect(()=>{
    if (defaultPolicies !== undefined) {
      setSelectedPolicies(defaultPolicies)
      if (role.role.name !== "") setRoleName(role.role.name);
    }
  }, [])

  const handlePolicyChange = (value) => {
    console.log("ROLENAME:",role.role.name)
    if (tmp.get(value.id) === undefined) {
      tmp.set(value.id, true)
      onRoleChange({"role": {"name": role.role.name, "id": role.role.id}, "policies": [...selectedPolicies, {id: value.id, name: value.name}]})
      setSelectedPolicies([...selectedPolicies, {id: value.id, name: value.name}])
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }

    axios.get(url+'/api/policies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setPolicies(response.data);
      })
      .catch(error => {
        console.error('Error fetching progress:', error);
      });
  }, [])

  
  const handleItemDelete = (value) => {
    tmp.delete(value)
    onRoleChange({"role": {"name": role.role.name, "id": role.role.id}, "policies": selectedPolicies.filter((item) => item.id !== value)})
    setSelectedPolicies(selectedPolicies.filter((item) => item.id !== value))
  }
  
  console.log("ROLE:",role)

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
      <Input onTextChange={handleRoleNameChange} value={roleName} placeholder={"Watcher"} label={"Name"}/>
      <RoleSelect placeholder={"Select Policy"} label="Policy" options={policies} onChange={handlePolicyChange} /> 
      {selectedPolicies.map((item)=>(
        <ItemBox content={item} onDelete={handleItemDelete}/>
      ))}
    </div>
  );
}

export default RolePopup;