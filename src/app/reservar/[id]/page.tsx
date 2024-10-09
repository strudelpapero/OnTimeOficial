import React from 'react';
import { useState, useEffect } from 'react';
import { RestaurantMenu, MenuItem } from '@/types'; // Importa la interfaz correcta


const ReservarPage = () => {
  const [restaurant, setRestaurant] = useState<RestaurantMenu | null>(null);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  return (
    <div className="container">
      <div className="header">
        <h2>{restaurant?.restaurante}</h2>
        <button className="close-btn">X</button>
      </div>
      <div className="calendar-container">
        <div className="month-selector">
          <button>{"<"}</button>
          <span>Junio</span>
          <button>{">"}</button>
        </div>
        <div className="calendar-grid">
          {/* Aquí renderizas los días del mes */}
          {Array(30).fill(null).map((_, index) => (
            <div key={index} className="calendar-day"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservarPage;
