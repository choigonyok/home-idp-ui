import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceTable from './ServiceTable.js';
import PodTable from './PodTable.js';
import IngressTable from './IngressTable.js';
import ConfigmapTable from './ConfigmapTable.js';
import SecretTable from './SecretTable.js';
import Namespaces from './Namespaces.js';

function Resources() {  
  const [pods, setPods] = useState([]);
  const [services, setServices] = useState([]);
  const [ingresses, setIngresses] = useState([]);
  const [secrets, setsecrets] = useState([]);
  const [configmaps, setconfigmaps] = useState([]);
  const [namespace, setNamespace] = useState("");

  const [openPods, setOpenPods] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openIngresses, setOpenIngresses] = useState(false);
  const [openSecrets, setOpenSecrets] = useState(false);
  const [openConfigmaps, setOpenConfigmaps] = useState(false);

  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  const handleOpenPods = () => {
    setOpenPods(!openPods);
    setOpenServices(false);
    setOpenSecrets(false);
    setOpenConfigmaps(false);
    setOpenIngresses(false);
  }
  const handleOpenServices = () => {
    setOpenPods(false);
    setOpenServices(!openServices);
    setOpenSecrets(false);
    setOpenConfigmaps(false);
    setOpenIngresses(false);
  }
  const handleOpenIngresses = () => {
    setOpenPods(false);
    setOpenServices(false);
    setOpenSecrets(false);
    setOpenConfigmaps(false);
    setOpenIngresses(!openIngresses);
  }
  const handleOpenConfigmaps = () => {
    setOpenPods(false);
    setOpenServices(false);
    setOpenSecrets(false);
    setOpenConfigmaps(!openConfigmaps);
    setOpenIngresses(false);
  }
  const handleOpenSecrets = () => {
    setOpenPods(false);
    setOpenServices(false);
    setOpenSecrets(!openSecrets);
    setOpenConfigmaps(false);
    setOpenIngresses(false);
  }

  useEffect(() => {
    const fetchData = () => {
      if (namespace === "") {
        return () => clearInterval(interval);    
      }
      axios.get(url+'/api/projects/'+namespace+'/resources')
        .then(response => {
          setconfigmaps(response.data.configmap);
          setsecrets(response.data.secret);
          setIngresses(response.data.ingress);
          setServices(response.data.service);
          setPods(response.data.pod);
        })
        .catch(error => {
          console.log(error);
        });
    };
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [namespace], 1000)

  const handleNamespace = (ns) => {
    setNamespace(ns);
  }
  
  return (
    <div>
      {openConfigmaps ?
        <h1>ConfigMaps</h1>
        :
        openSecrets ?
          <h1>Secrets</h1>
          :
          openPods ?
            <h1>Pods</h1>
            :
            openServices ?
              <h1>Services</h1>
              :
                openIngresses ?
                <h1>Ingresses</h1>
                :
                <h1>Resources</h1>
      }
      
      <Namespaces onSelectNamespace={handleNamespace}/>
      
      <div className='horizontal-bar'>
        <button className='btn' onClick={handleOpenPods}>Pods</button>
        <button className='btn' onClick={handleOpenServices}>Services</button>
        <button className='btn' onClick={handleOpenConfigmaps}>ConfigMaps</button>
        <button className='btn' onClick={handleOpenSecrets}>Secrets</button>
        <button className='btn' onClick={handleOpenIngresses}>Ingresses</button>
      </div>
        
      {openPods?
        <div>
          {pods !== null?
          <div>
            <PodTable data={pods}/>
          </div>
          :
          ""
          }
        </div>
      :
      ""
      }
      {openServices?
        <div>
          {services !== null?
          <div>
            <ServiceTable data={services}/>
          </div>
          :
          ""
          }
        </div>
      :
      ""
      }
      {openConfigmaps?
        <div>
          {configmaps !== null?
          <div>
            <ConfigmapTable data={configmaps}/>
          </div>
          :
          ""
          }
        </div>
      :
      ""
      }
      {openSecrets?
        <div>
          {secrets !== null ?
          <div>
            <SecretTable data={secrets}/>
          </div>
          :
          ""
          }
        </div>
      :
      ""
      }
      {openIngresses?
        <div>
          {ingresses !== null?
          <div>
            <IngressTable data={ingresses}/>
          </div>
          :
          ""
          }
        </div>
      :
      ""
      }
    </div>
    )
}

export default Resources;