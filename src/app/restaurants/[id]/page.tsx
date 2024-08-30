'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Reemplaza useRouter
import Header from '@/components/header';
import Image from 'next/image';
import { getRestaurantById} from '@/dataImprovisado/RestaurantData'  // Importa la función que obtiene los datos simulados
import { Restaurant } from '@/types'; // Nueva importación de la interfaz
import billete from '/public/Assets/icons/billete.svg'
import ubicacion from '/public/Assets/icons/ubicacion.svg'
import masInfo from '/public/Assets/icons/+.svg'

const RestaurantDetails = () => {
	const pathname = usePathname(); // Obtiene la ruta actual
	const id = pathname.split('/').pop(); // Extrae el id de la URL
	const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

	//en el caso de que importara useRouter
//const RestaurantDetails = () => {
//  const router = useRouter();
//  const { id } = router.query;
//	const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

// para la api real
 // useEffect(() => {
 //   if (id) {
 //     axios.get(`/api/restaurants/${id}`)
 //       .then(response => setRestaurant(response.data))
 //       .catch(error => console.error('Error fetching data:', error));
 //   }
 // }, [id]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (dish) => {
    setSelectedDish(dish);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedDish(null);
  };
//para la base de datos improvisada
	useEffect(() => {
		if (id) {
			const fetchedRestaurant = getRestaurantById(id as string);  // Utiliza los datos simulados
			setRestaurant(fetchedRestaurant || null);
		}
	}, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
		<>
  <Header/>
  <main>
    <div className="conteiner-imagen-resto">
      <img className="imagen-resto" src={restaurant.foto} alt={restaurant.nombre} />
    </div>

    <div className="conteiner-nombre-resto">
      <span className="nombre-resto">{restaurant.nombre}</span>
    </div>

    <div className="conteiner-ubicacion">
      <img className="icon-ubicacion" src="/Assets/icons/ubicacion.svg" alt="Ubicación" />
      <span className="ubicacion">{restaurant.direccion}</span>
    </div>

    <div className="conteiner-rango-precio">
      <img className="icon-billete" src="/Assets/icons/billete.svg" alt="Precio" />
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
        {restaurant.menu.map((item, index) => (
          <li key={index}>
            <div className="plato">
              <span>{item.name}</span> 
              <span className="descripcion">
                {item.description.length > 50 ? `${item.description.substring(0, 50)}...` : item.description}
                <button type="button" className="mas-info-btn" onClick={() => openPopup(item)}>más</button>
              </span>
              <div className="info">
                <span className="precio">{item.price}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isPopupOpen && selectedDish && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePopup}>X</button>
            <img src={selectedDish.imageUrl} alt={selectedDish.name} className="popup-image" />
            <h2>{selectedDish.name}</h2>
            <p>{selectedDish.description}</p>
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
