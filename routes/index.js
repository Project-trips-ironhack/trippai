const express = require("express");
const router = express.Router();
const Travel = require("../models/Travel");
const City = require("../models/City");
const User = require("../models/User");
const uploadCloud = require('../configs/cloudinary.js');
const ensureLogin   = require("connect-ensure-login");
const axios = require('axios');


// Show landing page:
router.get("/", (req, res, next) => {
  const currentUser = req.user;
  res.render("landing", { layout:false, currentUser });
});


// Show home page:
router.get("/home", (req, res, next) => {
  const currentUser = req.user;
  res.render("index", { currentUser });
});


// Show cities:
router.get('/cities', (req, res, next) => {
  const currentUser = req.user;

  Travel.find({})
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

    console.log(defCities);

    res.render('cities', dataPayload);
  })
  .catch(err => console.log(err));
});


// Show cities after params search:
router.post("/cities", (req, res, next) => {
  const currentUser = req.user;
  const { days, budget, tagsWanted, tagsNotWanted } = req.body;
  arrTagsWanted = tagsWanted.split(',');
  arrTagsNotWanted = tagsNotWanted.split(',');
  numberDays = +days;
  tripBudget = budget;

  Travel.find({$and: [ {days: {$size: numberDays}}, {budget: tripBudget}, {tags: {$all: arrTagsWanted}}, {tags: {$nin: arrTagsNotWanted}} ] })
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


// Show plans by city:
router.get('/cities/:name/plans', (req, res, next) => {
  const currentUser = req.user;

  Travel.find({"city.name": req.params.name})
    .populate('user')
    .then(plans => {
      let dataPayload = {plans, currentUser};
      res.render('plans', dataPayload)
    })
    .catch(err => console.log(err));
});


// Show plans after filtering params and selecting city:
router.post('/cities/plans', (req, res, next) => {
  const currentUser = req.user;
  const { cityName , days, budget, tagsWanted, tagsNotWanted } = req.body;

  console.log(req.body);

  arrTagsWanted = tagsWanted.split(',');
  arrTagsNotWanted = tagsNotWanted.split(',');
  numberDays = +days;
  tripBudget = budget;

  Travel.find({ $and: [{"city.name": cityName}, {days: {$size: numberDays}}, {budget: tripBudget}, {tags: {$all: arrTagsWanted}}, {tags: {$nin: arrTagsNotWanted}}] })
    .populate('user')
    .then(plans => {
      let dataPayload = {plans, currentUser};
      console.log(plans);
      res.render('plans', dataPayload)
    })
    .catch(err => console.log(err));
});


// Show all plans:
router.get('/plans', (req, res, next) => {
  const currentUser = req.user
  Travel.find({})
    .populate('user')
    .then(plans => {
      let dataPayload = {plans, currentUser};
      res.render('plans', dataPayload)
    })
    .catch(err => console.log(err));
});


// Show details of specific plan:
let idDetails;
router.get('/plans/:id/details', (req, res, next) => {
  idDetails = req.params.id
  const currentUser = req.user;
  Travel.findById(idDetails)
    .populate('user')
    .then(planDetails => {
      let dataPayload = {planDetails, currentUser};
      res.render('details', dataPayload)
    })
    .catch(err => console.log(err));
});


// This is used by axios request for markers on map:
router.get('/plans/details/api', (req, res, next) => {
Travel.findById(idDetails)
  .populate('user')
  .then(data => res.json(data))
  .catch(err => console.log(err));
});


// Show user's profile page:
router.get('/users/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const currentUser = req.user;
  User.findById(req.params.id)
  .then(user => {
    let userFound = user
    Travel.find({user: user._id})
  .then(userPlans => {
      let owner;
      currentUser ? 
        userFound.id === currentUser.id 
        ? owner = true 
        : owner = false 
      : owner = false
      let dataPayload;
      if(userPlans.length === 0) {
        dataPayload = {userFound, currentUser, owner};
      } else {
        dataPayload = {userFound, userPlans, currentUser, owner};
      }
      res.render('profile', dataPayload)
    });
  })
  .catch(err => console.log(err));
});


// Update user's profile:
router.post('/users/:id/edit', ensureLogin.ensureLoggedIn(), uploadCloud.single('user-img'), (req, res, next) => {
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


// Show current user's favorite plans:
router.get('/users/:id/favorites', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const currentUser = req.user;
  User.findById(req.params.id)
  .populate({
    path: 'favs',
    model: 'Travel',
    populate: {
      path: 'user',
      model: 'User'
    }
  })
  .then(user => {
    let favPlans = user.favs;
    dataPayload = {favPlans, currentUser};
    res.render('favPlans', dataPayload)
  })
  .catch(err => console.log(err))
});


// Add favorite plan to user:
router.post('/addfav', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  let userId = req.user._id;
  let planId = req.body.newFav;
  User.findByIdAndUpdate(userId, { "$push": { favs:  planId} })
  .then(user => {
    console.log(user);
  })
  .catch(err => console.log(err))
});


// Delete user's plan:
router.get('/plans/delete/:id', (req, res, user) => {
  Travel.findByIdAndDelete(req.params.id)
  .then(res.redirect(`/users/${req.user.id}`))
  .catch(err => console.log(err))
});


router.get("/test", (req, res, next) => {
  // const currentUser = req.user;
  axios.get('https://restcountries.eu/rest/v2/all')
  .then(allCountries=>{

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
  })
  
});


router.get("/test2", (req, res, next) => {
  // const currentUser = req.user;
    City.find()
    .then(allCities =>{

      res.render("create",{allCities} )
    })


    //https://restcountries.eu/rest/v2/name/{name}
  
  
});



// Show form to create a new plan:
router.get('/create', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const currentUser = req.user;
  res.render('create', {currentUser});
})


// Save a new plan to the DB:
router.post('/create', (req, res, next) => {
  let newTravel1 = req.body
  // let city = req.body.city.name
  console.log(newTravel1.city.imgName)
  axios.get(`https://api.unsplash.com/search/photos?page=1&query=${newTravel1.city.imgName}&client_id=${process.env.UNSPLASH_KEY}`) 
  .then((img) => {
    let cityImg;
    console.log(img.data);
    if(img.data.results.length === 0) {
      cityImg = '';
    } else {
      cityImg = img.data.results[0].urls.full;
    }

    newTravel1.city.img = cityImg


    Travel.create(newTravel1)
      .then((newTravel) => {
        console.log(newTravel._id)
        res.json(newTravel._id)
      })
      .catch(err => console.log(err))
  })
})

module.exports = router;