"use client";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LoginModalProps } from '@/types';

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Llama a useGoogleLogin antes de cualquier condición
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

        setUsername(res.data.name);
        setPassword(res.data.email); // Guarda el email en vez de password
        authenticateUser(res.data.name, res.data.email);
      } catch (err) {
        console.log(err);
      }
    },
    onError: () => console.log('Login failed'),
  });

  if (!isOpen) return null; // Retorno temprano solo después de haber llamado al hook

  interface User {
    id: number;
    name: string;
    email: string;
    // otros campos de user
  }

  const authenticateUser = (user: string, email: string) => {
    const userData = {
      user,
      email,
    };

    const handleUser = (user: User) => {
      console.log(user.name);
    };

    handleUser({ id: 0, name: user, email }); // Ajusta según tu lógica

    // Guarda userData en la cookie
    const expirationTime = new Date(new Date().getTime() + 600000); // 10 minutos
    Cookies.set('auth', JSON.stringify(userData), { expires: expirationTime });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-login" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-login">
          <h2>Log in</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-body-login">
          <form>
            <input type="email" placeholder="Correo electrónico" />
            <input type="password" placeholder="Contraseña" />
            <GoogleLogin
              onSuccess={() => googleLogin()}
              onError={() => {
                console.log('Login failed');
              }}
            />
            <button type="submit">INGRESAR</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
