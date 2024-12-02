import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from '../Projects/Popup';
import PolicyPopup from './PolicyPopup';
import PolicyTable from './PolicyTable';
import Button from '../Components/Button';
import Loading from '../Components/Loading';
import { useNavigate } from 'react-router-dom';
import Forbidden from '../Components/Forbidden';

function PolicyList() {
  const navigate = useNavigate();

  const [addPolicyPopup, setAddPolicyPopup] = useState(false);
  const [editPolicyPopup, setEditPolicyPopup] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [selectPolicy, setSelectPolicy] = useState([]);
  const [policy, setPolicy] = useState({});
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  const [forbidden, setForbidden] = useState("");
  const [errorNotJson, setErrorNotJson] = useState(false);
  const [errorNoTitle, setErrorNoTitle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddPolicyPopup = () => {
    setPolicy({})
    setAddPolicyPopup(!addPolicyPopup);
    setEditPolicyPopup(false);
  };

  const handleEditPolicyPopup = (item) => {
    setPolicy(item)
    setEditPolicyPopup(!editPolicyPopup);
    setAddPolicyPopup(false);
  };

  
  const handleDeletePolicy = async (event) => {
    event.preventDefault();       
    setIsLoading(true)

    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }

    axios.delete(url+'/api/policies/'+policy.id, {
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


  const handleSaveEditPoilcy = async (event) => {
    event.preventDefault(); 
    if (policy.name === "" || policy.name === undefined) {
      setErrorNoTitle(true)
      return
    }
    if (!isJSONString(policy.json)) {
      setErrorNotJson(true)
      return
    }
    setIsLoading(true)
      
    const policyData = {
      name: policy.name,
      json: policy.json,
    };

    const token = localStorage.getItem("jwt_token");
    if (token === null) {
      navigate("/login");
      return
    }

    axios.put(url+'/api/policies/'+policy.id, JSON.stringify(policyData), {
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

  const handleSaveAddPoilcy = async (event) => {
      event.preventDefault(); 

      if (policy.name === "" || policy.name === undefined) {
        setErrorNoTitle(true)
        return
      }
      if (!isJSONString(policy.json)) {
        setErrorNotJson(true)
        return
      }

      const token = localStorage.getItem("jwt_token");
      if (token === null) {
        navigate("/login");
        return
      }

      setIsLoading(true)
      const policyData = {
        name: policy.name,
        json: policy.json,
      };

      axios.post(url+'/api/policy', JSON.stringify(policyData), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          if (error.response.status === 403) {
            setForbidden("You don't have proper permission to access.\nPlease contact with your administrator.")
            setIsLoading(false)
          } else if (error.response.status === 401) {
            alert("You are not logged in!")
            navigate("/login")
          }
          console.error('Error fetching progress:', error);
          setIsLoading(false)
        });

      handleAddPolicyPopup(false)
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
        setIsLoading(false)
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

  const policyTable = [
    { Header: 'Name', accessor: 'name' },
  ];

  function isJSONString(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }

  const policyChangeHandle = (item) => {
    setPolicy(item)
    setErrorNotJson(false)
    setErrorNoTitle(false)
  }

  return <div>
    {forbidden === "" ?
      !isLoading ? 
        <div>
          <div style={{fontSize: '45px', fontWeight: "700", marginLeft: '10px', marginTop: '20px', marginBottom: '30px'}}>Policies</div>
          <Button onClick={handleAddPolicyPopup} label={"Add Policy"} disabled={false} />
          <PolicyTable data={policies} columns={policyTable} onClick={handleEditPolicyPopup}/>
          {addPolicyPopup ?
            <Popup title={"Add Policy"} onClose={handleAddPolicyPopup} onSave={handleSaveAddPoilcy} children={<PolicyPopup policy={policy} errorNotJson={errorNotJson} errorNoTitle={errorNoTitle} onPolicyChange={policyChangeHandle}/>}/>
            :
            ""
          }
          {editPolicyPopup ?
            <Popup title={"Edit Policy"} useDelete={true} onDelete={handleDeletePolicy} onClose={handleEditPolicyPopup} onSave={handleSaveEditPoilcy} children={<PolicyPopup policy={policy} onPolicyChange={policyChangeHandle}  errorNotJson={errorNotJson} errorNoTitle={errorNoTitle}/>}/>
            :
            ""
          }
        </div>
      : <Loading/>
    : <Forbidden message={forbidden}/>}
  </div>
}

export default PolicyList;

