import React from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, MiniMap, Controls, Background } from 'react-flow-renderer';

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Service A' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Service B' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Service C' }, position: { x: 400, y: 100 } },
  { id: '4', type: 'output', data: { label: 'Service D' }, position: { x: 250, y: 200 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'connected' },
  { id: 'e2-3', source: '2', target: '3', label: 'connected' },
  { id: 'e3-4', source: '3', target: '4', animated: true, label: 'connected' },
];

const NetworkFlow = () => {
  const [nodes, setNodes] = React.useState(initialNodes);
  const [edges, setEdges] = React.useState(initialEdges);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <div style={{ height: '500px' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          fitView
          style={{ backgroundColor: '#B3E5FC' }}
        >
          <MiniMap nodeColor={() => 'blue'} />
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default NetworkFlow;
