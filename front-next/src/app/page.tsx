// app/page.tsx
import { useState } from 'react';
import RegisterModal from '@/components/registerModal';
import LoginModal from '@/components/loginModal';
import Image from 'next/image';
import RestaurantePrincipal from '@/components/restaurantePrincipal';
import logoReloj from '/public/Assets/icons/logoReloj.svg';
import Header from '@/components/header';
import comidaMexicana from '/public/Assets/comidaMexicana.jpg'; // Placeholder image
import comidaItaliana from '/public/Assets/comidaItaliana.jpg'; // Placeholder image

const Home = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // Simular datos desde una base de datos o API
  const restaurantes = [
    { id: 1, name: 'AMAYTA PATISSERIE', image: comidaMexicana },
    { id: 2, name: 'ITALIANITA', image: comidaItaliana },
    // Añade más restaurantes según sea necesario
  ];

  return (
    <div>
      <div className="conteiner-azul"></div>

      <div className="conteiner-hero">
        <div className="hero">
          <div className="conteiner-logo">
            <a href="/"><Image className="logo-reloj" src={logoReloj} alt="Logo" width={50} height={50} /></a>
            <span className="logo-nombre"><a href="/">N TIME</a></span>
          </div>
          <div className="conteiner-registro">
            <span className="registro-texto" onClick={openRegisterModal}>REGISTRAR RESTAURANTE</span>
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
            <Image className="search-lupita" src="/public/Assets/icons/lupita.svg" alt="Buscar" width={20} height={20} />
          </button>
        </form>
      </div>
      <div className="menu">
        <RestaurantePrincipal restaurantes={restaurantes} />
      </div>

      {/* Modal para el registro */}
      <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} onLoginClick={openLoginModal} />

      {/* Modal para el login */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default Home;
