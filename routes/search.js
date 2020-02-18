const express = require("express");
const router = express.Router();
const User = require("../models/User");
const City = require("../models/City");

const Travel = require("../models/Travel");

let numberDays, tripBudget, arrTagsWanted, arrTagsNotWanted; 

router.post('/', (req, res, next) => {
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
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

module.exports = router;
