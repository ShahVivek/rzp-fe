
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyComponent from './MyComponent';
import TestingPage from './TestingPage'; 

function App() {

  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<MyComponent/>} />
        <Route path="/testing"  element={<TestingPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
