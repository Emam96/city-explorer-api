const axios = require('axios'); 
module.exports = getForecastHandler; 

let inMemory = {};

function getForecastHandler(req, res) {
    let searchQuery = req.query.searchQuery;
    // https://api.weatherbit.io/v2.0/forecast/daily?city=amman&key=
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`;
  

    if (inMemory[searchQuery] !== undefined) {
      console.log(" cache hit / WEATHER ");
      res.send(inMemory[searchQuery]);
    } else {
      console.log(" cache miss / WEATHER ");



    try {
      axios.get(url).then((searchResults) => {
        // console.log(searchResults.data.data);
  
        let forecastArray = searchResults.data.data.map((city) => {
          return new City(city);
        });
  
        inMemory[searchQuery] = forecastArray;

        res.send(forecastArray);
      });
    } catch (error) {
      console.log("error from axios", error);
      res.send(error);
    }
  
    console.dir(url);
  }
  
  class City {
    constructor(cityData) {
      this.description = cityData.weather.description;
      this.date = cityData.valid_date;
    }
  }
}