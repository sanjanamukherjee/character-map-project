import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
  } from 'reactflow';

import 'reactflow/dist/style.css';

import "./characterMapPage.css";
import { Header } from '../Header/Header';
  
export default function CharacterMapPageComponent(props: any): any {

  const search = useLocation().search;
  console.log(search);
  const title = new URLSearchParams(search).get('title');

  // useEffect(()=>{
  //   //call api here
  //   if(title!=""){
  //     console.log("function called here")
  //   }
  // },[]);

  const initialNodes = [
      { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
      { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    ];
    const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
  
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
    const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  
    return (
      <div style={{display: "flex", flexDirection:"column"}}>
          <Header/>
          <div style={{ width: '100vw', height: '100vh' }}>
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
              <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              />
              <Controls />
              <MiniMap />
              
          </div>
      </div>
  );
}