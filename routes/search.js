const express = require("express");
const router = express.Router();
const User = require("../models/User");
const City = require("../models/City");
const Day = require("../models/Day");
const Travel = require("../models/Travel");

router.post('/', (req, res, next) => {

    const {days, budget, tagsWanted, tagsNotWanted} = req.body;

    Travel.find({$and: [ {days: {$size: days}}, {budget: budget}, {tags: {$all: tagsWanted}}, {tags: {$nin: tagsNotWanted}} ] })
    .then(data => res.render('cities', {data}))
    .catch(err => console.log(err));
});

module.exports = router;
