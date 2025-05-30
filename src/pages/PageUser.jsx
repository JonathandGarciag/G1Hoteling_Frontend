import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../shared/protection/ProtectedRoutes';
import HotelList from '../components/UserView/HotelList';
import RoomList from '../components/UserView/RoomList';
import ReservationForm  from '../components/UserView/ReservationForm';
import { UserReservations }  from '../components/UserView/UserReservations';
import { AllEvents }  from '../components/UserView/AllEvents';
import  UserProfileForm   from '../components/UserView/UserProfileForm';
import  EventReservationForm   from '../components/UserView/EventReservationForm';

const PageUser = [
  <Route
    path="hotelView"
    element={
      <ProtectedRoute requiredRole="CLIENT_ROLE">
        <HotelList />
      </ProtectedRoute>
    }
    key="hotelView"
  />,
  <Route
    path="/hotels/:hotelId/rooms"
    element={
      <ProtectedRoute requiredRole="CLIENT_ROLE">
        <RoomList />
      </ProtectedRoute>
    }
    key="/hotels/:hotelId/rooms"
  />,
  <Route
    path="/reservar/:hotelId/:roomId"
    element={
      <ProtectedRoute requiredRole="CLIENT_ROLE">
        <ReservationForm  />
      </ProtectedRoute>
    }
    key="/reservar/:hotelId/:roomId"
  />,
 <Route
  path="/mis-reservas"
  element={
    <ProtectedRoute requiredRole="CLIENT_ROLE">
      <UserReservations />
    </ProtectedRoute>
  }
  key="/mis-reservas"
/>,
<Route
  path="/hotel/:hotelId/eventos"
  element={
    <ProtectedRoute requiredRole="CLIENT_ROLE">
      <AllEvents />
    </ProtectedRoute>
  }
  key="/hotel/:hotelId/eventos"
/>,
<Route
  path="/myProfile"
  element={
    <ProtectedRoute requiredRole="CLIENT_ROLE">
      <UserProfileForm />
    </ProtectedRoute>
  }
  key="/myProfile"
/>,
<Route
  path="/eventReservation"
  element={
    <ProtectedRoute requiredRole="CLIENT_ROLE">
      <EventReservationForm />
    </ProtectedRoute>
  }
  key="/eventReservation"
/>  
];

export default PageUser;