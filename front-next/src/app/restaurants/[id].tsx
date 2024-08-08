import { useRouter } from 'next/router';
import Image from 'next/image';

import Header from '@/components/header';


const Restaurant = () => {
  const router = useRouter();
  const { id } = router.query;

  // Verificación del id
  if (!id || typeof id !== 'string' || !(id in restaurantData)) {
    return <div>Restaurante no encontrado</div>;
  }

  const restaurant = restaurantData[id as RestaurantKey];

  return (
    <>
      <Header />
      
      <div className="conteiner-imagen-resto">
        <img className="imagen-resto" src={restaurant.imgSrc} alt={restaurant.name} />
      </div>

      <div className="conteiner-nombre-resto">
        <span className="nombre-resto">{restaurant.name}</span>
      </div>

      <div className="conteiner-ubicacion">
        <img className="icon-ubicacion" src={ubicacionIcon} />
        <span className="ubicacion">{restaurant.location}</span>
      </div>

      <div className="conteiner-rango-precio">
        <img className="icon-billete" src={billeteIcon} />
        <span className="rango-precio">{restaurant.priceRange}</span>
      </div>

      <div className="conteiner-reservar-button">
        <button className="reservar-button">RESERVAR</button>
      </div>

      <div className="nav-sections">
        <hr />
        <div className="nav-links">
          <a href="#nosotros" className="nav-link">Nosotros</a>
          <a href="#menu" className="nav-link">Menú</a>
          <a href="#resenas" className="nav-link">Reseñas</a>
        </div>
        <hr />
      </div>

      <section id="nosotros" className="section-content-nosotros">
        <h1>Opciones Alimentarias:</h1>
        <span>Gluten free, Vegetariano</span>
        <h1>Horarios de Atención:</h1>
        <span>Lunes: 7:30 a 00hs</span>
        <span>Martes: 7:30 a 00hs</span>
        <span>Miércoles: 7:30 a 00hs</span>
        <span>Jueves: 7:30 a 00hs</span>
      </section>

      <section id="menu" className="section-content-menu">
        <h1>Menú</h1>
        <div id="menu-items"></div>
        <div id="menu-descripcion"></div>
      </section>

      <section id="resenas" className="section-content-resenas">
        <h2>Reseñas</h2>
        <p>Opiniones de los clientes.</p>
      </section>

      <div className="conteiner-info-box" id="conteinerInfoBox">
        <div id="infoBox" className="info-box">
          <button className="close-info-box" id="closeInfoBox">X</button>
          <Image className="box-foto-plato" src={comidaMexicana} alt="foto plato"/>
          <h1 className="box-plato"></h1>
          <p className="box-info-plato"></p>
          <button type="button" className="agregar-al-pedido-btn">AGREGAR AL PEDIDO</button>
        </div>
      </div>
      <script src="script.js"></script>
      <script src="apiConnectionScript.js"></script>
    </div>
  );
};

export default Restaurant;
