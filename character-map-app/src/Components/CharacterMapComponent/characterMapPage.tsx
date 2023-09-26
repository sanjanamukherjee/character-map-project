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
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  NodeProps,
  DefaultEdgeOptions,
  NodeTypes
  } from 'reactflow';

import 'reactflow/dist/style.css';

import "./characterMapPage.css";
import { Header } from '../Header/Header';

export interface IRole {
  character: string
  relations: IRelation[] 
}

export interface IRelation {
  character: string
  rel: string
}

  
export default function CharacterMapPageComponent(props: any): any {

  const search = useLocation().search;
  const title = new URLSearchParams(search).get('title');

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [inpObj, setInp] = useState([]);
  const [loader, setLoader] = useState(true);

  const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const sampleInp = [
    {
        "character": "Elizabeth Bennet",
        "relations": [
            {
                "character": "Mr. Darcy",
                "rel": "romantic interest"
            },
            {
                "character": "Jane Bennet",
                "rel": "sister"
            },
            {
                "character": "Mr. Bennet",
                "rel": "father"
            },
            {
                "character": "Mrs. Bennet",
                "rel": "mother"
            },
            {
                "character": "Lydia Bennet",
                "rel": "sister"
            },
            {
                "character": "Mr. Bingley",
                "rel": "romantic interest"
            },
            {
                "character": "Charlotte Lucas",
                "rel": "friend"
            },
            {
                "character": "Mr. Collins",
                "rel": "unwanted suitor"
            }
        ]
    },
    {
        "character": "Mr. Darcy",
        "relations": [
            {
                "character": "Elizabeth Bennet",
                "rel": "romantic interest"
            },
            {
                "character": "Georgiana Darcy",
                "rel": "sister"
            }
        ]
    },
    {
        "character": "Jane Bennet",
        "relations": [
            {
                "character": "Elizabeth Bennet",
                "rel": "sister"
            },
            {
                "character": "Mr. Bingley",
                "rel": "romantic interest"
            }
        ]
    },
    {
        "character": "Mr. Bennet",
        "relations": [
            {
                "character": "Elizabeth Bennet",
                "rel": "daughter"
            },
            {
                "character": "Jane Bennet",
                "rel": "daughter"
            },
            {
                "character": "Lydia Bennet",
                "rel": "daughter"
            },
            {
                "character": "Mrs. Bennet",
                "rel": "wife"
            }
        ]
    },
    {
        "character": "Mrs. Bennet",
        "relations": [
            {
                "character": "Elizabeth Bennet",
                "rel": "daughter"
            },
            {
                "character": "Jane Bennet",
                "rel": "daughter"
            },
            {
                "character": "Lydia Bennet",
                "rel": "daughter"
            },
            {
                "character": "Mr. Bennet",
                "rel": "husband"
            }
        ]
    },
    {
        "character": "Lydia Bennet",
        "relations": [
            {
                "character": "Elizabeth Bennet",
                "rel": "sister"
            },
            {
                "character": "Mr. Wickham",
                "rel": "romantic interest"
            }
        ]
    },
    {
        "character": "Mr. Bingley",
        "relations": [
            {
                "character": "Elizabeth Bennet",
                "rel": "friend"
            },
            {
                "character": "Jane Bennet",
                "rel": "romantic interest"
            }
        ]
    },
    {
        "character": "Charlotte Lucas",
        "relations": [
            {
                "character": "Elizabeth Bennet",
                "rel": "friend"
            }
        ]
    },
    {
        "character": "Mr. Collins",
        "relations": [
            {
                "character": "Elizabeth Bennet",
                "rel": "unwanted suitor"
            }
        ]
    },
    {
        "character": "Georgiana Darcy",
        "relations": [
            {
                "character": "Mr. Darcy",
                "rel": "brother"
            }
        ]
    },
    {
        "character": "Mr. Wickham",
        "relations": [
            {
                "character": "Lydia Bennet",
                "rel": "romantic interest"
            }
        ]
    }
  ];


  const createInitialNodesEdges = (inpObj: IRole[]) =>{
    var initialNodes: any[]=[];
    var initialEdges: any[]=[];
    var existingRelns: string[]=[];
    // const initialEdges = [{ id: 'e1-2', source: 'a', target: 'b'}];
    for(let i =0; i<inpObj.length;i++){
      let n = {id: inpObj[i].character, position: { x: Math.floor(Math.random() * 1501), y: Math.floor(Math.random() * 1001)}, data:{ label: inpObj[i].character}}
      initialNodes.push(n)
      for( let x in inpObj[i].relations){
        var r:IRelation = inpObj[i].relations[x];
        if(!existingRelns.includes(r.character+"->"+inpObj[i].character)){
          let e = {id: inpObj[i].character+"->"+r.character, source: inpObj[i].character, target: r.character, label: r.rel}
          initialEdges.push(e)
          existingRelns.push(inpObj[i].character+"->"+r.character)
        }
      }
    }
    console.log("nodes - ")
    console.log(initialNodes)
    setNodes(initialNodes);

    console.log("edges - ");
    console.log(initialEdges);
    setEdges(initialEdges);
  }

  useEffect(()=>{
    //call api here
    if(title!=""){
      console.log("function called here")

      fetch("http://localhost:8080/try?title="+title)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        setInp(data)
        setLoader(false)
      });

    }
  },[]);

  useEffect(()=>{
    createInitialNodesEdges(inpObj)
    createInitialNodesEdges(inpObj)
  },[inpObj])

  // const initialNodes = [
  //     { id: 'a', position: { x: 0, y: 0 }, data: { label: 'Source' } },
  //     { id: 'b', position: { x: 1000, y: 400 }, data: { label: 'Destination' } },
  //   ];
    // const initialEdges = [{ id: 'e1-2', source: 'a', target: 'b'}];
  
    return (
      <div style={{display: "flex", flexDirection:"column"}}>
          <Header/>
          <div style={{ width: '100vw', height: '90vh' }}>

            {!loader &&                   
              <ReactFlow nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              >
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
              <Controls />
              <MiniMap />
              </ReactFlow>}

            {loader && 
            <div className='loader-container'>

            </div>}       
          </div>
      </div>
  );
}