import './App.css';
import Navbar from './components/layout/Navbar';
import HomeForm from './components/forms/HomeCountryMaterForm';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import StateMasterForm from './components/forms/StateMasterForm';
import CityMasterForm from './components/forms/CityMasterForm';
import AddressMasterForm from './components/forms/AddressMasterForm';
import React from 'react';
function App() {
  return (
    <Router>
    <div className="App">
    <Navbar/>&nbsp;&nbsp;
       <Routes>
     <Route path="/homeCountryMaterForm" element={<HomeForm/>} exact />
     <Route path="/stateMaterForm" element={<StateMasterForm/>} exact />
     <Route path="/cityMasterForm" element={<CityMasterForm/>} exact />
     <Route path="/addressMasterForm" element={<AddressMasterForm/>} exact />
    
    
     </Routes> 
     </div>
    </Router> 
  );
}

export default App;
