const axios = require('axios'); 
module.exports = getMovieHandler; 

// https://api.themoviedb.org/3/search/movie?api_key=&language=en-US&query=amman&include_adult=false

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