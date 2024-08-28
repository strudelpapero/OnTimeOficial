//interfaces necesarias
//declarar el tipo de los datos de 'restauranteData'
export interface MenuItem {
    name: string;
    price: string;
  }
  
  export interface Restaurant {
    id: string;
    nombre: string;
    foto: string;
    direccion: string;
    rangoPrecio: string;
    menu: MenuItem[];
  }