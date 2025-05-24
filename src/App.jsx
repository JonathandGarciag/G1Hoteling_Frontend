import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../src/pages/Dashboard'
import PageAdmin from './pages/PageAdmin';
import PageAuth from './pages/PageAuth';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}>
          {PageAdmin}
        </Route>
        {PageAuth}
      </Routes>
    </Router>   
  );
};

export default App;
  