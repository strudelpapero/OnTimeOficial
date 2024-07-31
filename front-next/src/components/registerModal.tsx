// components/RegisterModal.tsx
"use client";  // ← Añade esto al inicio del archivo

import React from 'react';

const RegisterModal = ({ isOpen, onClose, onLoginClick }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Registro</h2>
        </div>
        <div className="modal-body">
          <form>
            <input type="text" placeholder="Nombre" />
            <input type="password" placeholder="Contraseña" />
            <input type="email" placeholder="Correo Electrónico" />
            <input type="text" placeholder="Nombre Restaurante" />
            <input type="text" placeholder="Ubicación" />
            <input type="text" placeholder="Rango de Precios" />
            <input type="text" placeholder="Horarios" />
            <input type="text" placeholder="Cantidad de Mesas" />
            <button type="submit">REGISTRARSE</button>
          </form>
          <p>¿Ya tienes cuenta? <span onClick={onLoginClick} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Log In</span></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
