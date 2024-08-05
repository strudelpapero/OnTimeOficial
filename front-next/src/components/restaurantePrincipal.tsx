// components/RestaurantePrincipal.tsx
import Image from 'next/image';
import Link from 'next/link';
import comidaMexicana from '/public/Assets/comidaMexicana.jpg';


const RestaurantePrincipal = () => {
    return (
      <div className="restaurante-principal">
        <Link href="/restaurants/amayta">
          <div className="restaurante-link">
            <Image
              src={comidaMexicana}
              alt="Amayta Patisserie"
              width={600}
              height={400}
              className="restaurante-imagen"
            />
            <div className="restaurante-nombre">AMAYTA PATISSERIE</div>
          </div>
        </Link>
      </div>
    );
  };
  
  export default RestaurantePrincipal;