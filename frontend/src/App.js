
import './App.css';
import React, { useState, useEffect } from 'react';
import {  Router, Route,Routes, Navigate ,Link} from 'react-router-dom';
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
