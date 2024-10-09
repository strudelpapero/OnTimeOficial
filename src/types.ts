//interfaces necesarias
//declarar el tipo de los datos de 'restauranteData'
export interface MenuItem {
    plato: string;
    precio: string;
    descripcion: string;
    foto: string;
    vegetariano?: boolean;
    sin_gluten?: boolean;
    kosher?: boolean;
  }
  
  export interface RestaurantMenu {
    id: string;
    restaurante: string;
    foto: string;
    direccion: string;
    rangoPrecio: string;
    menu: MenuItem[];
  }

  export interface RestaurantList {
    id: string;
    nombre: string;
    foto: string;
  }

  export interface LoginModalProps {
    isOpen: boolean;      // Especifica que isOpen es un booleano
    onClose: () => void;  // Especifica que onClose es una función sin retorno
  }

//aaa
