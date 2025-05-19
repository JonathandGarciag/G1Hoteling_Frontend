import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/components/Login';
import Register from '../src/components/Register'; 
import Dashboard from '../src/pages/Dashboard'
import UserList from './components/users/UserList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}>
          <Route path="users" element={<UserList />} />
        </Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>   
  );
};

export default App;
