/*document.getElementById('searchInput').addEventListener('focus', function() {
    document.getElementById('searchButton').style.display = 'none';
  });
  
  document.getElementById('searchInput').addEventListener('blur', function() {
    document.getElementById('searchButton').style.display = 'flex';
  });
  */
  var masInfoBtn = document.querySelectorAll('.mas-info-btn');

  // Iterar sobre todos los botones de más información
  masInfoBtn.forEach(function(btn) {
      // Agregar un evento de clic a cada botón
      btn.addEventListener('click', function() {
          // Mostrar el recuadro de información cuando se hace clic en el botón
          infoBox.style.display = 'block';
      });
  });
  
  // Agregar un evento de clic al recuadro de información para ocultarlo cuando se hace clic fuera de él
  infoBox.addEventListener('click', function(e) {
      if (e.target === this) {
          // Ocultar el recuadro de información si se hace clic fuera de él
          infoBox.style.display = 'none';
      }
  });