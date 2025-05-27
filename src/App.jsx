import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/components/Login';
import Register from '../src/components/Register'; 
import Dashboard from '../src/pages/Dashboard';
import UserList from './components/users/UserList';

import ReservacionesList from './components/reservaciones/ReservacionesList';
import ReservacionesForm from './components/reservaciones/ReservacionesForm';
import EventoForm from './components/eventos/EventoForm';
import HabitacionForm from './components/habitaciones/HabitacionForm';
import ListaHabitacionesDisponibles from './components/habitaciones/ListaHabitacionesDisponibles';
import ListEventosPorHotel from './components/eventos/ListEventosPorHotel';
import GenerarFactura from './components/facturas/GenerateFactura';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="users" element={<UserList />} />
          <Route path="reservaciones" element={<ReservacionesList />} />
          <Route path="reservacion-form" element={<ReservacionesForm />} />
          <Route path="room-form" element={<HabitacionForm />} />
          <Route path="bill" element={<GenerarFactura />} /> 
          <Route path="room-list" element={<ListaHabitacionesDisponibles />} /></Route>
          <Route path="event-form" element={<EventoForm />}></Route>
          <Route path="events" element={<ListEventosPorHotel />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;