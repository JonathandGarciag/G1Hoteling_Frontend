import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
import PublicRoute from '../shared/protection/PublicRoute';

const PageAuth = [
  <Route
    path="/login"
    element={
      <PublicRoute>
        <Login />
      </PublicRoute>
    }
    key="login"
  />,
  <Route
    path="/register"
    element={
      <PublicRoute>
        <Register />
      </PublicRoute>
    }
    key="register"
  />,
  <Route
    path="/forgot-password"
    element={
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    }
    key="forgot"
  />,
  <Route
    path="/reset-password/:token"
    element={
      <PublicRoute>
        <ResetPassword />
      </PublicRoute>
    }
    key="reset"
  />,
];

export default PageAuth;
