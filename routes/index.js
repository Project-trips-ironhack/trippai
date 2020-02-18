const express = require('express');
const router = express.Router();
const User = require("../models/User");
const City = require("../models/City");
const Day = require("../models/Day");
const Travel = require("../models/Travel");
/* GET home page */
router.get('/', (req, res, next) => {
  const currentUser = req.user;
  res.render('index', {
    currentUser
  });
});

router.get('/test', (req, res, next) => {

  Travel.find({
      $and: [{
        days: {
          $size: 5
        }
      }, {
        budget: '💵💵'
      }, {
        tags: {
          $all: ['party', 'relax', 'cultural']
        }
      }, {
        tags: {
          $nin: []
        }
      }]
    })
    .populate('city')
    .populate('user')
    .then(data => res.render('plans', {
      data
    }))

})

module.exports = router;