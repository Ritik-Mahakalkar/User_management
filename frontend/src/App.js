
import './App.css';
import React, { useState, useEffect } from 'react';
import {   Route,Routes,Link} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login/Login';

function App() {
  
  return (
    <div className="App">
      <Login/>
      
    </div>
  );
}

export default App;
