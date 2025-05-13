import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import './App.css'; 

function App() {
  return (
    <Router>
      <div>
        <h1>Company Review Scraper</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;