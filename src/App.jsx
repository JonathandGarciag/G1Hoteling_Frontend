import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../src/pages/Dashboard';
import PageAdmin from './pages/PageAdmin';
import PageAuth from './pages/PageAuth';
import PageUser from './pages/PageUser';
import { AuthProvider } from './shared/hooks/useAuthContext'; // Asegúrate de tener este archivo creado

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            {PageAdmin}
            {PageUser}
          </Route>
          {PageAuth}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
