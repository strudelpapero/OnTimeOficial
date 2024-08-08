// src/components/RestaurantePrincipal.tsx
import RestauranteItem from './RestauranteItem';

interface Restaurante {
  id: number;
  name: string;
  image: string;
}

interface RestaurantePrincipalProps {
  restaurantes: Restaurante[];
}

const RestaurantePrincipal = ({ restaurantes }: RestaurantePrincipalProps) => {
  return (
    <div className="restaurantes-list">
      {restaurantes.map(restaurante => (
        <RestauranteItem
          key={restaurante.id}
          id={restaurante.id}
          name={restaurante.name}
          image={restaurante.image}
        />
      ))}
    </div>
  );
};

export default RestaurantePrincipal;
