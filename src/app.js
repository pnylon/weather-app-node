const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express configuration
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//const location = process.argv[2];

const getForecast = (address, res) => {
  geoCode(address, (gError, { latitude, longitude, location } = {}) => {
    if (gError) {
      return res.send({ gError });
    }
    forecast(latitude, longitude, (fError, forecastData) => {
      if (fError) {
        return res.send({ fError });
      }
      res.send({
        forecast: forecastData,
        location,
        address
      });
    });
  });
};

// Set up handlebars (hbs) engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Static directory to serve up
app.use(express.static(publicDir));

// app.get('/help', (req, res) => {
//   res.send(publicDirHelp);
// });

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Koola Mickobi',
    text: 'Find your weather'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    name: 'Koola Mickobi',
    text: 'We are strange people and wonder about strange things.'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Koola Mickobi',
    text: 'Get help here. '
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }

  //const location = req.query.address;
  //getForecast(req.query.address, res);

  geoCode(req.query.address, (gError, { latitude, longitude, location } = {}) => {
    if (gError) {
      return res.send({ gError });
    }
    forecast(latitude, longitude, (fError, forecastData) => {
      if (fError) {
        return res.send({ fError });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }
  console.log(req.query);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help page not found',
    name: 'Koola Mickobi',
    text:
      "The specific Help page you are looking for doesn't exist. Error - 404 Not Found"
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not found',
    name: 'Koola Mickobi',
    text:
      'The page you are looking for has either been removed or was never created. Error - 404 Not Found'
  });
});

app.get('/json', (req, res) => {
  res.send({
    name: 'JSON',
    text: 'Yayayaya'
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
