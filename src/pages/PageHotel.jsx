import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../shared/protection/ProtectedRoutes';

import ReservacionesList from '../components/reservaciones/ReservacionesList';
import ReservacionesForm from '../components/reservaciones/ReservacionesForm';
import HabitacionForm from '../components/habitaciones/HabitacionForm';
import GenerarFactura from '../components/facturas/GenerateFactura';
import ListaHabitacionesDisponibles from '../components/habitaciones/ListaHabitacionesDisponibles';
import EventoForm from '../components/eventos/EventoForm';
import ListEventosPorHotel from '../components/eventos/ListEventosPorHotel';

const PageHotel = [
  <Route
    path="reservaciones"
    element={
      <ProtectedRoute requiredRole="HOTEL_ROLE">
        <ReservacionesList />
      </ProtectedRoute>
    }
    key="reservaciones"
  />,
  <Route
    path="reservacion-form"
    element={
      <ProtectedRoute requiredRole="HOTEL_ROLE">
        <ReservacionesForm />
      </ProtectedRoute>
    }
    key="reservacion-form"
  />,
  <Route
    path="room-form"
    element={
      <ProtectedRoute requiredRole="HOTEL_ROLE">
        <HabitacionForm />
      </ProtectedRoute>
    }
    key="room-form"
  />,
  <Route
    path="bill"
    element={
      <ProtectedRoute requiredRole="HOTEL_ROLE">
        <GenerarFactura />
      </ProtectedRoute>
    }
    key="bill"
  />,
  <Route
    path="room-list"
    element={
      <ProtectedRoute requiredRole="HOTEL_ROLE">
        <ListaHabitacionesDisponibles />
      </ProtectedRoute>
    }
    key="room-list"
  />,
  <Route
    path="event-form"
    element={
      <ProtectedRoute requiredRole="HOTEL_ROLE">
        <EventoForm />
      </ProtectedRoute>
    }
    key="event-form"
  />,
  <Route
    path="events"
    element={
      <ProtectedRoute requiredRole="HOTEL_ROLE">
        <ListEventosPorHotel />
      </ProtectedRoute>
    }
    key="events"
  />
];

export default PageHotel;
