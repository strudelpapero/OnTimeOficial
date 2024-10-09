"use client"; // Asegura que el código se ejecute en el cliente

import { useRouter } from 'next/router';

interface ReservarButtonProps {
  restaurantId: string;
}

const ReservarButton: React.FC<ReservarButtonProps> = ({ restaurantId }) => {
  const router = useRouter();

  const handleReservar = () => {
    router.push(`/reservar/${restaurantId}`); // Redirige a la ruta del restaurante
  };

  return (
    <div className="conteiner-reservar-button">
      <button onClick={handleReservar} className="reservar-button">RESERVAR</button>
    </div>
  );
};

export default ReservarButton;
