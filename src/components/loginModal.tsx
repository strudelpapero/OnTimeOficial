"use client";  // ← Añade esto al inicio del archivo
import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Si lo necesitas para login manual

  const authenticateUser = (user) => {
    const expirationTime = new Date(new Date().getTime() + 600000);
    Cookies.set('auth', JSON.stringify(user), { expires: expirationTime });
  };

  if (!isOpen) return null;

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        // Autenticar al usuario directamente con los datos obtenidos
        const userData = {
          name: res.data.name,
          email: res.data.email,
          // O cualquier otra información relevante que quieras guardar
        };
        authenticateUser(userData);
      } catch (err) {
        console.log(err);
      }
    },
    onError: () => console.log('Error al iniciar sesión con Google'),
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-login" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-login">
          <h2>Log in</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-body-login">
          <form>
            <input
              type="text"
              placeholder="Nombre"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Controlando el input
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Controlando el input
            />
            <button type="button" onClick={() => googleLogin()}>
              Iniciar sesión con Google
            </button>
            <button type="submit">INGRESAR</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
