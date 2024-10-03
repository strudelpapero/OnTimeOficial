"use client";  // ← Añade esto al inicio del archivo
// import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import { useState } from 'react';
import axios from "axios"
// import Cookies from 'js-cookie'


const LoginModal = ({ isOpen, onClose }) => {


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const authenticateUser = (user, pass) => {
    const userData = {
      user,
      pass
    }
    const expirationTime = new Date (new Date().getTime() + 600000)
    Cookies.set('auth', JSON.stringify(userData), {expires: expirationTime})
  }


  if (!isOpen) return null;


  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`
            }
          }
        );
        setUsername(res.data.name)
        setPassword(res.data.password)
        authenticateUser(username, password)
      }catch (err){
        console.log(err)
      }
    }
  })
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-login" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-login">
          <h2>Log in</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-body-login">
          <form>
            <input type="text" placeholder="Nombre" />
            <input type="password" placeholder="Contraseña" />
            <GoogleLogin
              onSuccess={() => googleLogin()}
              onError={() => {
              console.log('Login failed')
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



