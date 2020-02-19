const express = require("express");
const router = express.Router();
const Travel = require("../models/Travel");
const City = require('../models/City');
const User = require('../models/User');

/* GET home page */
router.get("/", (req, res, next) => {
  const currentUser = req.user;
  res.render("index", { currentUser });
});


router.post("/cities", (req, res, next) => {
  const currentUser = req.user;
  const { days, budget, tagsWanted, tagsNotWanted } = req.body;
  arrTagsWanted = tagsWanted.split(',');
  arrTagsNotWanted = tagsNotWanted.split(',');
  numberDays = +days;
  tripBudget = budget;
  
  console.log(days)
  console.log(tripBudget)
  console.log(arrTagsWanted)
  console.log(arrTagsNotWanted)

  Travel.find({$and: [ {days: {$size: numberDays}}, {budget: tripBudget}, {tags: {$all: arrTagsWanted}}, {tags: {$nin: arrTagsNotWanted}} ] })
  .populate('city')
  .populate('user')
  .then(data => {
    let numberOfTravels = {};
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
      defCities.forEach(city1 =>{
        if(city1.name === city){
          city1.total = numberOfTravels[city]
        }
      });
    }

    const searchParams = {days, budget, tagsWanted, tagsNotWanted};
    let dataPayload = {defCities, searchParams, currentUser};

    res.render('cities', dataPayload);
  })
  .catch(err => console.log(err));
});



router.post('/cities/plans', (req, res, next) => {
  const currentUser = req.user;
  const { cityId , days, budget, tagsWanted, tagsNotWanted } = req.body;
  
  console.log(req.body)

  arrTagsWanted = tagsWanted.split(',');
  arrTagsNotWanted = tagsNotWanted.split(',');
  numberDays = +days;
  tripBudget = budget;

  Travel.find({ $and: [{city: cityId}, {days: {$size: numberDays}}, {budget: tripBudget}, {tags: {$all: arrTagsWanted}}, {tags: {$nin: arrTagsNotWanted}}] })
    .populate('city')
    .populate('user')
    .then(plans => {
      let dataPayload = {plans, currentUser};
      res.render('plans', dataPayload)
    })
    .catch(err => console.log(err));
});


let idDetails;
router.get('/plans/:id/details', (req, res, next) => {
  idDetails = req.params.id
  let currentUser = req.user;
  Travel.findById(idDetails)
    .populate('city')
    .populate('user')
    .then(planDetails => {
      let dataPayload = {planDetails, currentUser};
      res.render('details', dataPayload)
    })
    .catch(err => console.log(err));
});

router.get('/plans/details/api', (req, res, next) => {
Travel.findById(idDetails)
  .populate('city')
  .populate('user')
  .then(data => res.json(data))
  .catch(err => console.log(err));
})

module.exports = router;