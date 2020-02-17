const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  const currentUser = req.user;
  res.render('index', {currentUser});
});

module.exports = router;
