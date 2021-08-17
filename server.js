"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const server = express();
const PORT = process.env.PORT;
server.use(cors());
const axios = require("axios");

// https://api.themoviedb.org/3/search/movie?api_key=&language=en-US&query=amman&include_adult=false

server.get("/", homeHandler);
server.get("/forecast", getForecastHandler);
server.get("/movie", getMovieHandler);
server.get("*", notFoundHandler);

function homeHandler(req, res) {
  res.send("HOME");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////WEATHER

function getForecastHandler(req, res) {
  let searchQuery = req.query.searchQuery;
  // https://api.weatherbit.io/v2.0/forecast/daily?city=amman&key=
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`;

  try {
    axios.get(url).then((searchResults) => {
      // console.log(searchResults.data.data);

      let forecastArray = searchResults.data.data.map((city) => {
        return new City(city);
      });

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// MOVIE

function getMovieHandler(req, res) {
  let searchQuery = req.query.searchQuery;
  // https://api.themoviedb.org/3/search/movie?api_key=&language=en-US&query=amman&include_adult=false
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchQuery}&include_adult=false`;

  try {
    axios.get(url).then((searchResults) => {
      console.log(searchResults.data.results);

      let movieArray = searchResults.data.results.map((city) => {
        return new Movie(city);
      });

      res.send(movieArray);
    });
  } catch (error) {
    console.log("error from axios", error);
    res.send(error);
  }

  console.dir(url);
}

class Movie {
  constructor(cityData) {
    this.title = cityData.title;
    this.poster = `https://image.tmdb.org/t/p/original/${cityData.poster_path}`;                        //  cityData.poster_path; 
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// OTHER

function notFoundHandler(req, res) {
  res.status(404).send({
    error: "Unable to get the route",
  });
}

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});


