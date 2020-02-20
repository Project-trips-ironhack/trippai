const express = require("express");
const router = express.Router();
const Travel = require("../models/Travel");
const City = require("../models/City");
const User = require("../models/User");
const uploadCloud = require('../configs/cloudinary.js');
const axios = require('axios');


/* GET home page */
router.get("/", (req, res, next) => {
  const currentUser = req.user;
  res.render("index", { currentUser });
});


router.get('/cities', (req, res, next) => {
  const currentUser = req.user;

  Travel.find({})
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

    let dataPayload = {defCities, currentUser};

    res.render('cities', dataPayload);
  })
  .catch(err => console.log(err));
});


router.post("/cities", (req, res, next) => {
  const currentUser = req.user;
  const { days, budget, tagsWanted, tagsNotWanted } = req.body;
  arrTagsWanted = tagsWanted.split(',');
  arrTagsNotWanted = tagsNotWanted.split(',');
  numberDays = +days;
  tripBudget = budget;

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


router.get('/cities/:id/plans', (req, res, next) => {
  const currentUser = req.user;

  Travel.find({city: req.params.id})
    .populate('city')
    .populate('user')
    .then(plans => {
      let dataPayload = {plans, currentUser};
      res.render('plans', dataPayload)
    })
    .catch(err => console.log(err));
});


router.post('/cities/plans', (req, res, next) => {
  const currentUser = req.user;
  const { cityId , days, budget, tagsWanted, tagsNotWanted } = req.body;

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


router.get('/plans', (req, res, next) => {
  const currentUser = req.user
  Travel.find({})
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
  const currentUser = req.user;
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
});


router.get('/users/:id', (req, res, next) => {
  const currentUser = req.user;
  User.findById(req.params.id)
  .then(user => {
    let userFound = user
    Travel.find({user: user._id})
    .populate('city')
  .then(userPlans => {
      let owner;
      
      currentUser ? 
        userFound.id === currentUser.id 
        ? owner = true 
        : owner = false 
      : owner = false
      let dataPayload = {userFound, userPlans, currentUser, owner};
      res.render('profile', dataPayload)
    });
  })
  .catch(err => console.log(err));
});


router.post('/users/:id/edit', uploadCloud.single('user-img'), (req, res, next) => {
  if(req.file) {
    User.findByIdAndUpdate(req.params.id, {$set: {username: req.body.username, email: req.body.email, cityOrigin: req.body.cityOrigin, imgPath: req.file.url}})
    .then(res.redirect(`/users/${req.user.id}`))
    .catch(err => console.log(err));
  } else {
    User.findByIdAndUpdate(req.params.id, {$set: {username: req.body.username, email: req.body.email, cityOrigin: req.body.cityOrigin}})
    .then(res.redirect(`/users/${req.user.id}`))
    .catch(err => console.log(err));
  }
});

router.get("/test", (req, res, next) => {
  // const currentUser = req.user;
  axios.get('https://restcountries.eu/rest/v2/all')
  .then(allCountries=>{
   // console.log(allCountries)
   let countries = []

   
    // let countries = []
    allCountries.data.forEach(country => {
      let tempCountry = {
        name : country.name,
        code : country.alpha2Code,
        capital: country.capital
      }
     countries.push(tempCountry) 
    })
    res.render("create", {countries});


    //https://restcountries.eu/rest/v2/name/{name}
  })
  
});


router.get("/test2", (req, res, next) => {
  // const currentUser = req.user;
    City.find()
    .then(allCities =>{
      console.log(allCities)
      res.render("create",{allCities} )
    })


    //https://restcountries.eu/rest/v2/name/{name}
  
  
});




module.exports = router;