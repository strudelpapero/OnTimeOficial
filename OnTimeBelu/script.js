document.getElementById('searchInput').addEventListener('focus', function() {
    document.getElementById('searchButton').style.display = 'none';
  });
  
  document.getElementById('searchInput').addEventListener('blur', function() {
    document.getElementById('searchButton').style.display = 'flex';
  });
  