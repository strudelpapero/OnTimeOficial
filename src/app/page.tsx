"use client";
// app/page.tsx

import { useState, useEffect } from 'react';
//import axios from 'axios';
import { useRouter } from 'next/navigation'; // Importa useRouter para la navegación
import LoginModal from '@/components/loginModal';
import Link from 'next/link'; 
import Image from 'next/image';
import { RestaurantList } from '@/types'; // Nueva importación de la interfaz
import { RestaurantMenu, MenuItem } from '@/types';

const Home = () => {
  const router = useRouter();  // ← Aquí es donde usas `useRouter`
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<RestaurantList[]>([]); // Define el tipo aquí
  
    useEffect(() => {
      async function fetchRestaurants() {
        try {
          const response = await fetch('/api/getRest/'); // Asegúrate de poner la ruta correcta
          const data: RestaurantList[] = await response.json(); // Asegúrate de usar el tipo correcto
          setRestaurants(data);
          console.log(data);          
        } catch (error) {
          console.error('Error fetching restaurants:', error);
        }
      }
  
      fetchRestaurants();
    }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

//  const openLoginModal = () => {
//    setIsRegisterModalOpen(false);
//    setIsLoginModalOpen(true);
//  };
//  const closeLoginModal = () => setIsLoginModalOpen(false);

//PARA CUANDO HAYA API
  //useEffect(() => {
  //  // Obtén los datos de los restaurantes desde tu API
  //  axios.get('/api/restaurants')
  //    .then(response => setRestaurants(response.data))
  //    .catch(error => console.error('Error fetching data:', error));
  //}, []);

  const handleLogin = (restaurantId: string) => {
    closeLoginModal();
    router.push(`/restaurants/${restaurantId}`);
  };



  return (
    <div className="conteiner">
      <div className="conteiner-azul"></div>

      <div className="conteiner-hero">
        <div className="hero">
          <div className="conteiner-logo">
            <a href="/"><Image className="logo-reloj" src="/Assets/icons/logoReloj.svg" alt="Logo" width={50} height={50} /></a>
            <span className="logo-nombre"><a href="/">N TIME</a></span>
          </div>
          <div className="conteiner-registro">
            <span className="registro-texto" onClick={openLoginModal}>REGISTRAR RESTAURANTE</span>
          </div>
        </div>
      </div>
      <div className="p1-titulo">
        <h1 className="titulo-busqueda">Elegi donde comer!</h1>
      </div>
      <div className="conteiner-navbar-search">
        <form className="search-form">
          <input type="search" placeholder="Buscar..." className="search-input" id="searchInput" />
          <button type="submit" className="search-button" id="searchButton">
            <Image className="search-lupita" src={'/Assets/icons/lupita.svg'} alt="Buscar" width={20} height={20} />
          </button>
        </form>
      </div>

      <div className="restaurant-list">
        {Array.isArray(restaurants) && restaurants.length > 0 ? (
          restaurants.map(restaurant => (
            <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`}>
              <div className="restaurante-principal">
                <Image className="restaurante-imagen" src={restaurant.foto} alt={restaurant.nombre} width={350} height={200}/>
                <span className="restaurante-nombre">{restaurant.nombre}</span>
              </div>
            </Link>
          ))
        ) : (
          <p>No restaurants found.</p>
        )}
      </div>

      
            
      {/* Modal para el registro */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

      {/* Modal para el login */}
    </div>
  );
};
export default Home;
