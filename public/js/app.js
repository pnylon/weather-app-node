const weatherSearch = document.querySelector('#weather-search');
const searchInput = document.querySelector('.city-input');
const errorMessage = document.querySelector('.error');
const locationMessage = document.querySelector('.location');
const forecastMessage = document.querySelector('.forecast');

weatherSearch.addEventListener('submit', eve => {
  eve.preventDefault();
  const locationForm = eve.target[0].value;
  const locationInput = searchInput.value;
  //console.log(locationForm);
  //console.log(locationInput);

  locationMessage.textContent = 'Loading...';
  forecastMessage.textContent = '';
  errorMessage.textContent = '';

  // Client side browser method.
  fetch(`http://localhost:3000/weather?address=${locationInput}`).then(response => {
    response.json().then(data => {
      if (data.gError || data.fError) {
        data.gError
          ? (errorMessage.textContent = data.gError)
          : (errorMessage.textContent = data.fError);
        searchInput.value = '';
      } else {
        locationMessage.textContent = data.location;
        forecastMessage.textContent = data.forecast;
        searchInput.value = '';
      }
    });
  });
});
