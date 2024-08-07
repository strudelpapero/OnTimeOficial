// pages/restaurants/[id].tsx
import { useRouter } from 'next/router';
import Image from 'next/image';
import Header from '@/components/header';


const Restaurant = () => {
  const router = useRouter();
  const { id } = router.query;

  const restaurantData = {
    amayta: {
      name: 'AMAYTA PATISSERIE',
      location: 'Juncal 1207',
      priceRange: '$18.000-20.000',
      imgSrc: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudGVzfGVufDB8fDB8fHww',
    },
    // Agrega más datos de restaurantes aquí
  };

  const restaurant = restaurantData[id as string];

  if (!restaurant) {
    return <div>Restaurante no encontrado</div>;
  }

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
        <img className="icon-ubicacion" src="/Assets/icons/ubicacion.svg" />
        <span className="ubicacion">{restaurant.location}</span>
      </div>
      
      <div className="conteiner-rango-precio">
        <img className="icon-billete" src="/Assets/icons/billete.svg" />
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
          <img className="box-foto-plato" src="/Assets/imgDeComida/comidaMexicana.jpg" />
          <h1 className="box-plato"></h1>
          <p className="box-info-plato"></p>
          <button type="button" className="agregar-al-pedido-btn">AGREGAR AL PEDIDO</button>
        </div>
      </div>
      <style>{/* Agrega tus estilos aquí */}</style>
      <script src="script.js"></script>
      <script src="apiConnectionScript.js"></script>
    </div>
  );
};

export default Restaurant;
