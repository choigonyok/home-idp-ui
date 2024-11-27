import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from '../Projects/Popup';
import RolePopup from './RolePopup';
import RoleTable from './RoleTable';
import Button from '../Components/Button';
import Loading from '../Components/Loading';
import { useNavigate } from 'react-router-dom';
import Forbidden from '../Components/Forbidden';

function RoleList() {
  const navigate = useNavigate();
  const [addRolePopup, setAddRolePopup] = useState(false);
  const [editRolePopup, setEditRolePopup] = useState(false);
  
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({"role": {"name": "", "id": ""}, "policies": []});
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  const [forbidden, setForbidden] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleAddRolePopup = () => {
    if (addRolePopup) {
      setRole({"role": {"name": "", "id": ""}, "policies": []})
    }
    setAddRolePopup(!addRolePopup);
  };

  const handleEditRolePopup = (item) => {
    const test = roles.filter((role)=>(
      role.name === item.name
    ))
    setRole({"role": {"name": item.name, "id": test[0].id}, "policies": test[0].policies})
    setEditRolePopup(true)
  }

  const openEditRolePopup = () => {
    if (editRolePopup) {
      setRole({"role": {"name": "", "id": ""}, "policies": []})
    }
    setEditRolePopup(!editRolePopup);
  };

  const handleSaveAddRole = async (event) => {
      event.preventDefault(); 
      
      const token = localStorage.getItem("jwt_token");
      if (token === null) {
        navigate("/login");
        return
      }
      
      setIsLoading(true)

      axios.post(url+'/api/role', JSON.stringify(role), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          window.location.reload();
          setIsLoading(false)
        })
        .catch(error => {
          if (error.response.status === 403) {
            setForbidden(error.response.data)
            setIsLoading(false)
          } else if (error.response.status === 401) {
            navigate("/login")
          }
          console.error('Error fetching progress:', error);
          setIsLoading(false)
        });
  };

  const handleSaveEditRole = async (event) => {
    event.preventDefault(); 
    
    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }
    
    setIsLoading(true)

    axios.put(url+'/api/roles/'+role.role.id, JSON.stringify(role), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        window.location.reload();
        setIsLoading(false)
      })
      .catch(error => {
        if (error.response.status === 403) {
          setForbidden(error.response.data)
          setIsLoading(false)
        } else if (error.response.status === 401) {
          navigate("/login")
        }
        console.error('Error fetching progress:', error);
        setIsLoading(false)
      });
};

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }
    
    axios.get(url+'/api/roles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setRoles(response.data.map((item) => ({
          id: item.role.id,
          name: item.role.name,
          policies: item.policies,
          ps: getPolicyString(item.policies),
        })))
        setIsLoading(false)
      })
      .catch(error => {
        if (error.response.status === 403) {
          setForbidden(error.response.data)
          setIsLoading(false)
        } else if (error.response.status === 401) {
          navigate("/login")
        }
        console.error('Error fetching progress:', error);
        setIsLoading(false)
      });
  }, [])

  const getPolicyString = (items) => {
    if (items === undefined) return "-";
    const tmp = []
    items.map((item)=>{      
      tmp.push(item.name)
    })

    return tmp.join(", ")
  }

  const handleDeleteRole = async (event) => {
    event.preventDefault();       
    
    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }
    
    setIsLoading(true)

    axios.delete(url+'/api/roles/'+role.role.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        if (error.response.status === 403) {
          setForbidden(error.response.data)
          setIsLoading(false)
        } else if (error.response.status === 401) {
          navigate("/login")
        }
        console.error('Error fetching progress:', error);
        setIsLoading(false)
    })
  }


  const rolelistTable = [
    { Header: 'Name', accessor: 'name'},
    { Header: 'Policies', accessor: 'ps'},
  ];

  return <div>
    {forbidden === "" ?
      !isLoading ?
        <div>
          <div style={{fontSize: '45px', fontWeight: "700", marginLeft: '10px', marginTop: '20px', marginBottom: '30px'}}>Roles</div>
          <Button onClick={handleAddRolePopup} label={"Add Role"} disabled={false} />
          <RoleTable data={roles} columns={rolelistTable} onClickRole={handleEditRolePopup}/>
          {addRolePopup?
            <div>
            <Popup title={"Add Role"} onClose={handleAddRolePopup} onSave={handleSaveAddRole} children={<RolePopup onRoleChange={setRole} role={role}/>}/>
            </div>
            :
            ""
          }
          {editRolePopup?
            <div>
            <Popup title={"Edit Role"} onClose={openEditRolePopup} useDelete={true} onDelete={handleDeleteRole} onSave={handleSaveEditRole} children={<RolePopup defaultPolicies={role.policies}  onRoleChange={setRole} role={role}/>}/>
            </div>
            :
            ""
          }
        </div>
      : <Loading/>
    : <Forbidden message={forbidden}/>}
  </div>
}

export default RoleList;

