const getDishes = async () => {
    try {
        const response = await fetch("http://localhost:3000/getDishes", {
            mode: 'cors' // Asegúrate de que CORS esté habilitado
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parsea la respuesta a JSON
        console.log(data);
        renderDishes(data); // Llama a la función para renderizar los datos
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const renderDishes = (dishes) => {
    const menuItemsContainer = document.getElementById('menu-items');
    menuItemsContainer.innerHTML = ''; // Limpia el contenedor antes de agregar los nuevos elementos

    dishes.forEach(dish => {
        const dishElement = document.createElement('div');
        dishElement.classList.add('plato');

        dishElement.innerHTML = `
            <span>${dish.nombre}</span>
            <div class="info">
                <button type="button" class="mas-info-btn">
                    <img class="mas-info" src="Assets/icons/+.svg" alt="Mas informacion">
                </button>
                <span id="precio">$${dish.precio}</span>
            </div>
        `;
        menuItemsContainer.appendChild(dishElement);
    });
};
getDishes();
