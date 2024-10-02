"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Reemplaza useRouter
import Header from '@/components/header';
import Image from 'next/image';
import { RestaurantMenu, MenuItem } from '@/types'; // Importa la interfaz correcta
import billete from '/public/Assets/icons/billete.svg';
import ubicacion from '/public/Assets/icons/ubicacion.svg';
import comidaItaliana from '/public/Assets/comidaItaliana.jpg';

const RestaurantDetails = () => {
  const pathname = usePathname(); // Obtiene la ruta actual
  const id = pathname.split('/').pop(); // Extrae el id de la URL
  const [restaurant, setRestaurant] = useState<RestaurantMenu | null>(null);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (dish: MenuItem) => {
    setSelectedDish(dish);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedDish(null);
  };

  useEffect(() => {
    if (id) {
      const fetchRestaurant = async () => {
        try {
          const response = await fetch(`/api/getInfo_RestyPlatos/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: any[] = await response.json(); // Ajustamos el tipo a 'any' para poder manipular los datos fácilmente
          console.log(data); // Para ver los datos que llegan desde la API

          // Mapeamos los datos para ajustarlos al tipo `RestaurantMenu`
          if (data.length > 0) {
            const restaurantData: RestaurantMenu = {
              id: id || '',
              restaurante: data[0].restaurante,
              foto: data[0].foto || '/public/Assets/comidaItaliana.jpg', // Imagen por defecto si no hay foto
              direccion: data[0].direccion,
              rangoPrecio: `$${data[0].precio_minimo} - $${data[0].precio_maximo}`,
              menu: data.map(item => ({
                plato: item.plato,
                descripcion: item.descripcion,
                precio: `$${item.precio}`,
                foto: item.foto || '/public/Assets/comidaItaliana.jpg', // Imagen por defecto si no hay foto
                vegetariano: item.vegetariano,
                sin_gluten: item.sin_gluten,
                kosher: item.kosher,
              })),
            };
            setRestaurant(restaurantData);
          }
        } catch (error) {
          console.error('Error fetching restaurant:', error);
        }
      };
      fetchRestaurant();
    }
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <div className="conteiner-imagen-resto">
          <Image className="imagen-resto" src={restaurant.foto} alt={restaurant.restaurante} width={350} height={200} />
        </div>

        <div className="conteiner-nombre-resto">
          <span className="nombre-resto">{restaurant.restaurante}</span>
        </div>

        <div className="conteiner-ubicacion">
          <Image className="icon-ubicacion" src={ubicacion} alt="Ubicación" />
          <span className="ubicacion">{restaurant.direccion}</span>
        </div>

        <div className="conteiner-rango-precio">
          <Image className="icon-billete" src={billete} alt="Precio" />
          <span className="rango-precio">{restaurant.rangoPrecio}</span>
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

        <section id="menu" className="section-content-menu">
          <h1>Menú</h1>
          <ul>
            {restaurant.menu && restaurant.menu.length > 0 ? (
              restaurant.menu.map((item, index) => (
                <li key={index}>
                  <div className="plato">
                    <div className="plato-descripcion">
                      <span>{item.plato}</span> <br></br>
                      <span className="descripcion">
                        {item.descripcion.length > 50 ? `${item.descripcion.substring(0, 50)}...` : item.descripcion}
                        <button type="button" className="mas-info-btn" onClick={() => openPopup(item)}>más</button>
                      </span>
                    </div>
                    <div className="info">
                      <span className="precio">{item.precio}</span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>No hay platos disponibles</li>
            )}
          </ul>
          {isPopupOpen && selectedDish && (
            <div className="conteiner-info-box">
              <div className="info-box" onClick={(e) => e.stopPropagation()}>
                <button className="close-info-box" onClick={closePopup}>X</button>
                <Image src={selectedDish.foto} alt={selectedDish.plato} className="box-foto-plato" width={200} height={100}/>
                <h2 className='box-plato'>{selectedDish.plato}</h2>
                <p className='box-info-plato'>{selectedDish.descripcion}</p>
                <div>
                  {selectedDish.vegetariano && <span>Vegetariano</span>}
                  {selectedDish.sin_gluten && <span>Sin Gluten</span>}
                  {selectedDish.kosher && <span>Kosher</span>}
                </div>
              </div>
            </div>

          )}
        </section>

        <section id="resenas" className="section-content-resenas">
          <h2>Reseñas</h2>
          <p>Opiniones de los clientes.</p>
        </section>
      </main>
    </>
  );
};

export default RestaurantDetails;
