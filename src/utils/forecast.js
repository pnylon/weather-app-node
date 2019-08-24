const request = require('request');

const formatForcast = (summary, currentTemp, precipProb) => {
  const formatter = `Forcast Summary: ${summary}. Current temperature is ${currentTemp} and there is a ${precipProb}% chance of rain.`;
  // const formatter = {
  //   summary,
  //   currentTemp,
  //   precipProb
  // };
  return formatter;
};

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/862d88f11c103e0fa97ac5792502ed36/${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('There was an error connecting to the host.', undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined);
    } else {
      callback(
        undefined,
        formatForcast(
          body.currently.summary,
          body.currently.temperature,
          body.currently.precipProbability
        )
      );
    }
  });
};

module.exports = forecast;

// https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicG55bG9uIiwiYSI6ImNqeXNzY3Y3NDBmdTMzbHF1ZGpnN3UzangifQ.6hkDjcSUqxcx7mI10YJRkw&limit=1
// pk.eyJ1IjoicG55bG9uIiwiYSI6ImNqeXNzY3Y3NDBmdTMzbHF1ZGpnN3UzangifQ.6hkDjcSUqxcx7mI10YJRkw

// const url =
//   'https://api.darksky.net/forecast/862d88f11c103e0fa97ac5792502ed36/37.8267,-122.4233';
// const urlJa =
//   'https://api.darksky.net/forecast/862d88f11c103e0fa97ac5792502ed36/37.8267,-122.4233?units=si&lang=ja';
// const urlLa =
//   'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicG55bG9uIiwiYSI6ImNqeXNzY3Y3NDBmdTMzbHF1ZGpnN3UzangifQ.6hkDjcSUqxcx7mI10YJRkw&limit=1';

// let printWeather = body => {
//   console.log(`${body.daily.data[0].summary} `);
//   console.log(
//     `It is currently ${body.currently.summary} and ${
//       body.currently.temperature
//     } degrees outside.`
//   );
//   console.log(`There is a ${body.currently.precipProbability}% chance of rain.`);
// };

// request({ url: urlJa, json: true }, (error, response) => {
//   if (error) {
//     console.log(
//       `There was an error connecting to the host. ${error.host} not found.`
//     );
//   } else if (response.body.error) {
//     console.log(`Unable to find location. ${response.body.error.code} error.`);
//   } else {
//     printWeather(response.body);
//   }
//   //console.log(response.body.currently);
// });
