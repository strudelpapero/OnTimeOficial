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
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

getDishes();
