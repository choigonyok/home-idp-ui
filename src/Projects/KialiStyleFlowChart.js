import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import ReactFlow, { ReactFlowProvider, applyNodeChanges, addEdge, MiniMap, Controls, Background } from "react-flow-renderer";
import "react-flow-renderer/dist/style.css";
import "react-flow-renderer/dist/theme-default.css";
import { stringify } from "uuid";

function KialiStyleFlowChart({onNamespace}) {
  const [pods, setPods] = useState([]);
  const [services, setServices] = useState([]);
  const [ingresses, setIngresses] = useState(null);
  const [secrets, setsecrets] = useState([]);
  const [configmaps, setconfigmaps] = useState([]);
  const [namespace, setNamespace] = useState("");
  
  const schema = process.env.REACT_APP_BACKEND_SCHEMA;
  const host = process.env.REACT_APP_BACKEND_HOST;
  const port = process.env.REACT_APP_BACKEND_PORT;
  const url = `${schema}://${host}:${port}`

  useEffect(() => {
    if (onNamespace === "") return;
      axios.get(url+'/api/projects/'+onNamespace+'/resources')
        .then(response => {
          var cmData = response.data.configmap.map((item, index) => ({
            id: "[configmap]"+item.metadata.name,
            data: { label: item.metadata.name},
            position: { x: 50+index*170, y: 1000 },
            style: {
              backgroundColor: "#FFDAC1",
              color: "#8B4513",
              padding: 10,
              borderRadius: "8px",
              border: "2px solid #FFA07A",
            },
            draggable: true
          }));

          var podData = response.data.pod.map((item, index) => ({
            id: "[pod]"+item.metadata.name,
            data: { label: item.metadata.name},
            position: { x: 50+index*170, y: 500 },
            style: {
              backgroundColor: "#B5EAD7",
              color: "#556B2F",
              padding: 10,
              borderRadius: "8px",
              border: "2px solid #66CDAA",
            },
            draggable: true
          }));

          var secretData = response.data.secret.map((item, index) => ({
            id: "[secret]"+item.metadata.name,
            data: { label: item.metadata.name},
            position: { x: 50+index*170, y: 750 },
            style: {
              backgroundColor: "#C7CEEA",
              color: "#4B0082",
              padding: 10,
              borderRadius: "8px",
              border: "2px solid #8A9AD6",
            },
            draggable: true
          }));

          var serviceData = response.data.service.map((item, index) => ({
            id: "[service]"+item.metadata.name,
            data: { label: item.metadata.name},
            position: { x: 50+index*170, y: 250 },
            style: {
              backgroundColor: "#FFB7B2",
              color: "#8B0000",
              padding: 10,
              borderRadius: "8px",
              border: "2px solid #FF6F61",
            },
            draggable: true
          }));

          var ingressData = response.data.ingress.map((item, index) => ({
            id: "[ingress]"+item.metadata.name,
            data: { label: item.metadata.name },
            position: { x: 50+index*170, y: 0 },
            style: {
              backgroundColor: "#A2D2FF",
              color: "#1E3A5F",
              padding: 10,
              borderRadius: "8px",
              border: "2px solid #6CA6E2",
            },
            draggable: true
          }));
          
          var ingressEdges = [];
          response.data.ingress.map((ingress)=>{
            ingress.spec.rules.map((rule)=>(
              rule.http.paths.map((path, index)=> {
                const exist = ingressEdges.find(item => item.source === ingress.metadata.name && item.target === path.backend.service.name)
                if (exist === undefined) {
                  ingressEdges.push({
                    id: "[ingress]"+ingress.metadata.name+":"+"[service]"+path.backend.service.name,
                    source: "[ingress]"+ingress.metadata.name,
                    target: "[service]"+path.backend.service.name,
                    animated: true, style: { stroke: "#1E88E5", strokeWidth: 2 },
                  })
                }
              })
            ))
          });

          var serviceEdges = [];
          response.data.service.map((s)=>{
            response.data.pod.map((p)=>{
              const map = new Map(Object.entries(p.metadata.labels));
              const ok = Object.entries(s.spec.selector).every(([key, value]) => map.get(key) === value)
              if (ok) {
              serviceEdges.push({
                id: "[service]"+s.metadata.name+":"+"[pod]"+p.metadata.name,
                source: "[service]"+s.metadata.name,
                target: "[pod]"+p.metadata.name,
                animated: true, style: { stroke: "#1E88E5", strokeWidth: 2 },
              })
              }
            })
          })

          var secretEdges = [];
          response.data.pod.map((p)=>{
            p.spec.volumes.map((volume)=>{
              if (volume.secret !== undefined) {
                secretEdges.push({
                  id: "[secret]"+volume.secret.secretName+":"+"[pod]"+p.metadata.name,
                  source: "[pod]"+p.metadata.name,
                  target: "[secret]"+volume.secret.secretName,
                  animated: true, style: { stroke: "#1E88E5", strokeWidth: 2 },
                })
              }
            })
          })

          var configmapEdges = [];
          response.data.pod.map((p)=>{
            p.spec.volumes.map((volume)=>{
              if (volume.configMap !== undefined) {
                configmapEdges.push({
                  id: "[configmap]"+volume.configMap.name+":"+"[pod]"+p.metadata.name,
                  source: "[pod]"+p.metadata.name,
                  target: "[configmap]"+volume.configMap.name,
                  animated: true, style: { stroke: "#1E88E5", strokeWidth: 2 },
                })
              }
            })
          })
          
          var filteredConfigmapEdges = Array.from(new Map(configmapEdges.map(item => [item.id, item])).values());
          var filteredSecretEdges = Array.from(new Map(secretEdges.map(item => [item.id, item])).values());
          var filteredServiceEdges = Array.from(new Map(serviceEdges.map(item => [item.id, item])).values());
          var filteredIngressEdges = Array.from(new Map(ingressEdges.map(item => [item.id, item])).values());
          
          setEdges([...filteredIngressEdges, ...filteredServiceEdges, ...filteredConfigmapEdges,...filteredSecretEdges]);
          setNodes([...cmData, ...podData, ...secretData, ...serviceData, ...ingressData]);
        })
        .catch(error => {
          console.log(error);
        });
  }, [onNamespace])

  

  const onNodesChange = useCallback((changes) => setNodes((ns) => applyNodeChanges(changes, ns)), []);
  
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlowProvider>
      <ReactFlow
        // elements={[...nodes, ...edges]}
        nodesDraggable={true}
        nodesConnectable={false}
        zoomOnScroll={true}
        selectNodesOnDrag={false}
        elementsSelectable={true}
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        // fitView
        style={{ background: "#F5F5F5" }}
      >
        <Controls />
        <Background color="#aaa" gap={16}/>
      </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default KialiStyleFlowChart;
