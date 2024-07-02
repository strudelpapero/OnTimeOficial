document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/api/platos');
      const platos = await response.json();

      const plato1 = platos.find(plato => plato.id === 1); // Ajusta esto según el ID del plato que desees mostrar
      if (plato1) {
        document.querySelector('#plato1 span').textContent = plato1.nombre;
        document.getElementById('precio').textContent = `$${plato1.precio}`;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });