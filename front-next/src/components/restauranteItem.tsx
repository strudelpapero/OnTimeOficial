// src/components/RestauranteItem.tsx
import Image from 'next/image';
import Link from 'next/link';

interface RestauranteItemProps {
  id: number;
  name: string;
  image: string;
}

const RestauranteItem = ({ id, name, image }: RestauranteItemProps) => {
  return (
    <div className="restaurante-principal">
      <Link href={`/restaurantes/${id}`} legacyBehavior>
        <a className="restaurante-link">
          <Image
            src={image}
            alt={name}
            width={600}
            height={400}
            className="restaurante-imagen"
          />
          <div className="restaurante-nombre">{name}</div>
        </a>
      </Link>
    </div>
  );
};

export default RestauranteItem;
