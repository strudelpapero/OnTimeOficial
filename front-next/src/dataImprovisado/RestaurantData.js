// data/restaurantData.js
export const restaurantData = [
    {
      id: '1',
      nombre: 'Restaurante Mexicano',
      foto: '/Assets/comidaMexicana.jpg',
      direccion: '123 Calle Falsa, Ciudad',
      rangoPrecio: '$$',
      menu: [
        { name: 'Tacos al Pastor', price: '$10' },
        { name: 'Enchiladas', price: '$12' },
      ],
    },
    {
      id: '2',
      nombre: 'Restaurante Italiano',
      foto: '/Assets/comidaItaliana.jpg',
      direccion: '456 Via Roma, Ciudad',
      rangoPrecio: '$$$',
      menu: [
        { name: 'Pizza Margherita', price: '$15' },
        { name: 'Lasagna', price: '$18' },
      ],
    },
  ];
  
  export const getRestaurantById = (id) => {
    return restaurantData.find(restaurant => restaurant.id === id);
  };
  