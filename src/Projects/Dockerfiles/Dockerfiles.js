import React, { useEffect, useState } from 'react';
import Step from "../Step";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const PipelineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChildContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const TraceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 30px;
`;


function Dockerfiles() {
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`
  const [traces, setTraces] = useState([]);
  const [rootTrace, setRootTrace] = useState([]);
  const [firstTrace, setFirstTrace] = useState([]);
  const [secondTrace, setSecondTrace] = useState([]);
  const { trace_id } = useParams();
  
  const getFirstLabel = (index) => {
    if (index === 0 ) {
      return "Dockerfile"
    }
    if (index === 1 ) {
      return "Build"
    }
    if (index === 2 ) {
      return "Deploy"
    }
  }

  const getFirstStatus = (index) => {
    if (index === 0 ) {
      return "PENDING"
    }
    if (index === 1 ) {
      return "PENDING"
    }
    if (index === 2 ) {
      return "PENDING"
    }
    return "none"
  }

  const getSecondLabel = (index1, index2) => {
    if (index1 === 0 && index2 === 0 ) {
      return "Store Dockerfile in DB"
    }
    if (index1 === 0 && index2 === 1 ) {
      return "Push Dockerfile to Github"
    }
    if (index1 === 2 && index2 === 0 ) {
      return "Push Manifest to Github"
    }
    if (index1 === 2 && index2 === 1 ) {
      return "Send Webhook to ArgoCD"
    }
    return ""
  }

  const getSecondStatus = (index1, index2) => {
    if (index1 === 0 && index2 === 0 ) {
      return "PEDNING"
    }
    if (index1 === 0 && index2 === 1 ) {
      return "PEDNING"
    }
    if (index1 === 2 && index2 === 0 ) {
      return "PEDNING"
    }
    if (index1 === 2 && index2 === 1 ) {
      return "PEDNING"
    }
    return "none"
  }
  

  useEffect(()=>{
    const fetchData = () => {
      axios.get(url+'/api/traces/'+trace_id)
        .then(response => {
          setRootTrace(response.data[0])
          const trace1 = response.data.filter((item)=>item.parent_span_id === response.data[0].span_id)
          setFirstTrace(trace1)
          const trace2 = []
          trace1.map((firstTrace)=>{
            const trace3 = response.data.filter((item)=>item.parent_span_id === firstTrace.span_id)
            trace2.push(trace3)
          })
          setSecondTrace(trace2)
        })
        .catch(error => {
          console.error('Error fetching progress:', error);
        });
    };
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  },[], 1000)

  console.log(secondTrace)

  return (
    <TraceContainer>
      <PipelineContainer>
        {rootTrace !== undefined ?
          <Step label={"Trace ID: "+rootTrace.span_id} duration={rootTrace.duration} status={rootTrace.status}/>
          :
          <Step label={"Trace is Loading..."} duration={""} status={"PENDING"}/>
        }
      </PipelineContainer>
      <PipelineContainer>
      {Array.from({ length: 3 }).map((_, i) => (
        firstTrace[i] !== undefined ?       
          <Step label={getFirstLabel(i)} duration={firstTrace[i].duration} status={firstTrace[i].status}/>
        :
          <Step label={getFirstLabel(i)} duration={""} status={getFirstStatus(i)}/>
      ))}
      </PipelineContainer>
      <PipelineContainer>
        {Array.from({ length: 3 }).map((_, index) => (
          <ChildContainer>
            {secondTrace[index] !== undefined ?       
              Array.from({ length: 2 }).map((_, index2) => (
                secondTrace[index][index2] !== undefined ?       
                <Step label={getSecondLabel(index, index2)} duration={secondTrace[index][index2].duration} status={secondTrace[index][index2].status}/>
                :
                <Step label={getSecondLabel(index, index2)} duration={""} status={getSecondStatus(index, index2)}/>
              ))
              : 
              Array.from({ length: 2 }).map((_, index2) => (
                <Step label={getSecondLabel(index, index2)} duration={""} status={getSecondStatus(index, index2)}/>
              ))
          }
          </ChildContainer>
        ))}
      </PipelineContainer>
    </TraceContainer>
  )
}

export default Dockerfiles;
