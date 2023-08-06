import React from 'react';
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from './Components/Header/Header';
import { LandingPage } from './Components/LandingPageComponent/landingPage';
import CharacterMapPageComponent from './Components/CharacterMapComponent/characterMapPage';

function App() {
  return (
    // <div className="App">
    //   <Header />
    // </div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
        {/* <Route index /> */}
      <Route path="map" element={<ReactFlowProvider><CharacterMapPageComponent /> </ReactFlowProvider>} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      {/* </Route> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
