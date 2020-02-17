const express = require("express");
const router = express.Router();
const Travel = require("../models/Travel");

/* GET home page */
router.get("/", (req, res, next) => {
  const currentUser = req.user;
  res.render("index", { currentUser });
});

router.get("/cities", (req, res, next) => {
  Travel.find({
    $and: [
      { days: { $size: 2 } },
      { budget: "💵💵" },
      { tags: { $all: ["cultural", "party", "cultural"] } },
      { tags: { $nin: [] } }
    ]
  })
    .populate("city")
    .populate("user")
    // .then(data => res.json(data))
    .then(data => {
      let numberOfTravels = {};
      let total = "agramenauer"
      let cities = data.map(travel => (travel = travel.city));
      let defCities = cities.filter(city => {
        if (numberOfTravels[city.name]) {
          numberOfTravels[city.name] += 1;
          return false;
        } else {
          numberOfTravels[city.name] = 1;
          return true;
        }
      });

      for (city in numberOfTravels) {
        console.log("POR AQUI")
        defCities.forEach(city1 =>{
          console.log("ola")
          if(city1.name === city){
            console.log("lo encontro")
            city1.total = numberOfTravels[city]
          }
        })
     
      }


      
      res.json(defCities);
      // res.render('cities', {cities, travels}))
    })

    .catch(err => console.log(err));
});

module.exports = router;
