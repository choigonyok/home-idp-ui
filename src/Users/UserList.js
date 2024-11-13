import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loading from '../Components/Loading';
import Table from '../Components/Table';
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import Popup from '../Projects/Popup';
import Button from '../Components/Button';
import Forbidden from '../Components/Forbidden';
import UserInput from '../Projects/UserInput';

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState(new Map());
  const [namespace, setNamespace] = useState("");
  
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  const [editUserPopup, setEditUserPopup] = useState(false);
  const [user, setUser] = useState({});
  const [forbidden, setForbidden] = useState("");

  const addKeyValue = (key, value) => {
    setRole((prevMap) => {
      const updatedMap = new Map(prevMap);
      updatedMap.set(key, value);
      return updatedMap;
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }
    
    users.map((usr)=> {
      axios.get(url+'/api/users/'+usr.id+'/role', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          addKeyValue(response.data.id, response.data.name);
        })
        .catch(error => {
          console.error('Error fetching progress:', error);
      });
    })
  }, [users])

  

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }

    axios.get(url+'/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    .then(response => {
      const m = new Map()
      const username = []
      response.data.map((user)=>{
        const tmp = []
        if (m.get(user.name) !== undefined) {
          tmp.push(...String(m.get(user.name)).split(", "))
        }
        tmp.push(user.project_name)
        m.set(user.name, tmp)
      })

      setUsers(Array.from(response.data.map((user, index)=>(
        {
          id: user.id,
          name: user.name,
          role_id: user.role_id,
          role: user.role_name,
          projects: Array.from(m.get(user.name)).join(", ") || "-",
          created: format(new Date(user.create_time), "yyyy-MM-dd"),
        }
      ))).filter((item, index, self) => {
        const itemAsString = JSON.stringify(item);
        return index === self.findIndex((t) => JSON.stringify(t) === itemAsString);
      })
      );
    })
    .catch(error => {
      if (error.response.status === 403) {
        setForbidden(error.response.data)
      } else if (error.response.status === 401) {
        navigate("/login")
      }
      console.error('Error fetching progress:', error);
    });
  }, [])

  const userTable = [
    { Header: 'Username', accessor: 'name' },
    { Header: 'Role', accessor: 'role' },
    { Header: 'Projects', accessor: 'projects' },
    { Header: 'Created', accessor: 'created' },
  ];

  const handleEditUserPopup = (item) => {
    if (item === undefined) {
      setEditUserPopup(false);
      setUser({})
      return
    }
    setEditUserPopup(true);
    setUser({"user_id": item.id, "username": item.name, "role_id": item.role_id})
  };


  const handleSaveEditUser = async (event) => {
    event.preventDefault(); 

    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }

    axios.put(url+'/api/users/'+user.username+"/role", JSON.stringify(user), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error)
        if (error.response.status === 403) {
          setForbidden(error.response.data)
        } else if (error.response.status === 401) {
          navigate("/login")
        }
        console.error('Error fetching progress:', error);
      });
  };

  console.log(user)

  return (
    <div>
      {forbidden === "" ?
        users.length !== 0 ? 
        <div>
          <div style={{fontSize: '45px', fontWeight: "700", marginLeft: '10px', marginTop: '20px', marginBottom: '30px'}}>Users</div>
          {/* <Button onClick={handleOpenUserPopup} label={"Add User"} disabled={false} /> */}
          <Table data={users} columns={userTable} onClick={handleEditUserPopup}/>
          {editUserPopup ?
            <Popup 
            onSave={handleSaveEditUser}
            onClose={handleEditUserPopup}
            title={"Edit User"}  
            children={<UserInput userData={user} onUserChange={setUser}/>}/>
            :
            ""
          }
        </div>
      : <Loading/>
      : <Forbidden message={forbidden}/>}
    </div>
  )
}

export default UserList;