"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const server = express();
const PORT = process.env.PORT;
server.use(cors());

const weather = require('./data/weather.json');









// localhost:4000/getData?cityName=
server.get('/getData',(req,res)=>{
    
  console.log(req.query);
    let nName = req.query.cityName;
    // console.log(city.city_name.toLowerCase());
    let info = weather.find(city=>{
      if(city.city_name.toLowerCase()===nName.toLowerCase()) {
          return city;
      }
  })
  res.send(info);
    
})



server.get("*", (req, res) => {
  res.status(404).send("404: NOT FOUND");
});

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});