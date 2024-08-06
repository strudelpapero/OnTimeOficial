// src/app/restaurants/page.tsx
import RestauranteInfo from '../../components/restauranteInfo'; // Ajusta la ruta si es necesario
import comidaMexicana from '/public/Assets/comidaMexicana.jpg';

const RestaurantePage = () => {
  const restaurantData = {
    nombreResto: 'AMAYTA PATISSERIE',
    ubicacion: 'Juncal 1207',
    rangoPrecio: '$18.000-20.000',
    imagenResto: comidaMexicana,
    platos: [
      { id: 1, name: 'Plato 1', price: 1000 },
      { id: 2, name: 'Plato 2', price: 2000 },
      // Añade más platos según sea necesario
    ],
  };

  return <RestauranteInfo {...restaurantData} />;
};

export default RestaurantePage;
