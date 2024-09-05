"use client";

import React, { useState } from 'react';
import axios from 'axios';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onLoginClick }) => {
  // Mover los hooks fuera de cualquier condición
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nombreRestaurante, setNombreRestaurante] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [cantidadMesas, setCantidadMesas] = useState('');

  // Si el modal no está abierto, no renderizar el contenido del modal, pero los hooks ya han sido llamados
  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRestaurant = {
      nombre,
      password,
      email,
      nombreRestaurante,
      ubicacion,
      cantidadMesas,
    };

    try {
      const response = await axios.post('/api/registerRestaurant', newRestaurant);
      console.log('Restaurante registrado:', response.data);
      onClose(); // Cerrar el modal después de registrarse
    } catch (error) {
      console.error('Error registrando el restaurante:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Registro</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nombre Restaurante"
              value={nombreRestaurante}
              onChange={(e) => setNombreRestaurante(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ubicación"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cantidad de Mesas"
              value={cantidadMesas}
              onChange={(e) => setCantidadMesas(e.target.value)}
            />
            <button type="submit">REGISTRARSE</button>
          </form>
          <p>¿Ya tienes cuenta? <span onClick={onLoginClick} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Log In</span></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
