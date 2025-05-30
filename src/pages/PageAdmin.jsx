import React from 'react';
import { Route } from 'react-router-dom';
import UserList from '../components/adminView/UserList';
import ChangeRoleV from '../components/adminView/Changerole';
import HotelList from '../components/adminView/HotelList';
import ProtectedRoute from '../shared/protection/ProtectedRoutes';
import HotelDetail from '../components/hotel/hotelDetail';
import HotelManage from '../components/adminView/HotelManage';

const PageAdmin = [
  <Route
    path="users"
    element={
      <ProtectedRoute requiredRole="ADMIN_ROLE">
        <UserList />
      </ProtectedRoute>
    }
    key="users"
  />,
  <Route
    path="updateRole/:id"
    element={
      <ProtectedRoute requiredRole="ADMIN_ROLE">
        <ChangeRoleV />
      </ProtectedRoute>
    }
    key="updateRole"
  />,
  <Route
    path="hotel/viewHotel"
    element={
      <ProtectedRoute requiredRole="ADMIN_ROLE">
        <HotelList />
      </ProtectedRoute>
    }
    key="hotels"
  />,
  <Route
    path="hotel/:id"
    element={
      <ProtectedRoute requiredRole="ADMIN_ROLE">
        <HotelDetail />
      </ProtectedRoute>
    }
    key="hotelDetail"
  />,
  <Route
    path="hotel/manage"
    element={
      <ProtectedRoute requiredRole="ADMIN_ROLE">
        <HotelManage />
      </ProtectedRoute>
    }
    key="hotelManage"
  />
];

export default PageAdmin;