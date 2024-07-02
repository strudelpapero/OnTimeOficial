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
                <button type="button" class="mas-info-btn" data-nombre="${dish.nombre}" data-descripcion="${dish.descripcion}" data-imagen="${dish.imagen}">
                    <img class="mas-info" src="Assets/icons/+.svg" alt="Mas informacion">
                </button>
                <span id="precio">$${dish.precio}</span>
            </div>
        `;
        menuItemsContainer.appendChild(dishElement);
    });

    // Añadir event listeners a los nuevos botones mas-info-btn
    document.querySelectorAll('.mas-info-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const nombre = event.currentTarget.getAttribute('data-nombre');
            const descripcion = event.currentTarget.getAttribute('data-descripcion');
            const imagen = event.currentTarget.getAttribute('data-imagen');

            document.querySelector('.box-plato').textContent = nombre;
            document.querySelector('.box-info-plato').textContent = descripcion;
            document.querySelector('.box-foto-plato').src = imagen;

            // Mostrar el contenedor de la caja de información
            document.getElementById('conteinerInfoBox').classList.add('show');
        });
    });
};

// Añadir event listener al botón de cerrar después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('closeInfoBox').addEventListener('click', () => {
        document.getElementById('conteinerInfoBox').classList.remove('show');
    });
});

getDishes();
