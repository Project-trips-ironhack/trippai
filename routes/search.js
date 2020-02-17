const express = require("express");
const router = express.Router();
const User = require("../models/User");
const City = require("../models/City");
const Day = require("../models/Day");
const Travel = require("../models/Travel");

router.post('/', (req, res, next) => {
<<<<<<< HEAD

    const {days, budget, tagsWanted, tagsNotWanted} = req.body;

    Travel.find({$and: [ {days: {$size: days}}, {budget: budget}, {tags: {$all: tagsWanted}}, {tags: {$nin: tagsNotWanted}} ] })
    .then(data => res.render('cities', {data}))
=======
    const { days, budget, tagsWanted, tagsNotWanted } = req.body;
    let arrTagsWanted = tagsWanted.split(',')
    let arrTagsNotWanted = tagsNotWanted.split(',')
    let numberDays = +days
    console.log(days)
    console.log(budget)
    console.log(arrTagsWanted)
    console.log(arrTagsNotWanted)

    Travel.find({$and: [ {days: {$size: numberDays}}, {budget: budget}, {tags: {$all: arrTagsWanted}}, {tags: {$nin: arrTagsNotWanted}} ] })
    // .then(data => res.render('cities', {data}))
    .then(data => res.json(data))
>>>>>>> 2c67df9bd4978314a984a2ef1d8fbe2535fe6fd3
    .catch(err => console.log(err));
});

module.exports = router;
