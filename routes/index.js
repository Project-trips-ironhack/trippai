const express = require('express');
const router  = express.Router();
const test = {
  tags: [
    "relax"
  ],
  _id: "5e4abd3dd2f1afc210122bb2",
  budget: "💵💵💵",
  name: "repudiandae enim facere",
  city: "5e4abd3dd2f1afc21012299e",
  user: "5e4abd3dd2f1afc2101229a4",
  days: [{
      breakfast: {
        position: {
          lat: 18.7079,
          lon: 42.953
        },
        place: "Gloves",
        address: "Windler Course",
        description: "Facere illo unde consequuntur omnis ut aut totam iste."
      },
      lunch: {
        position: {
          lat: -47.6959,
          lon: -70.2048
        },
        place: "Bike",
        address: "Wolff Inlet",
        description: "Nam cum aliquam."
      },
      dinner: {
        position: {
          lat: 68.4814,
          lon: -154.3332
        },
        place: "Pizza",
        address: "Adonis Plaza",
        description: "Dolorum doloremque voluptatem."
      },
      morning: [{
        position: {
          lat: 6.8643,
          lon: 45.4365
        },
        _id: "5e4abd3dd2f1afc210122bb4",
        place: "Fish",
        address: "Kale Summit",
        duration: "3 or more hours",
        description: "At iste tempora eos quis iusto recusandae eum aliquam."
      }],
      afternoon: [{
        position: {
          lat: 67.0079,
          lon: -113.4046
        },
        _id: "5e4abd3dd2f1afc210122bb5",
        place: "Tuna",
        address: "Nels Rue",
        duration: "2-3 hours",
        description: "Voluptatem alias nihil."
      }],
      _id: "5e4abd3dd2f1afc210122bb3"
    },
    {
      breakfast: {
        position: {
          lat: -9.1907,
          lon: 29.4725
        },
        place: "Car",
        address: "Shanahan Shoals",
        description: "Commodi ut pariatur harum explicabo dolorum totam."
      },
      lunch: {
        position: {
          lat: 86.0447,
          lon: -129.0558
        },
        place: "Fish",
        address: "Ricky Camp",
        description: "Ut et culpa sunt magnam quae consequatur."
      },
      dinner: {
        position: {
          lat: -49.702,
          lon: 86.9034
        },
        place: "Cheese",
        address: "Francis Roads",
        description: "Sunt ut quia veritatis dolores in corporis."
      },
      morning: [{
        position: {
          lat: -72.5403,
          lon: -63.3282
        },
        _id: "5e4abd3dd2f1afc210122bb7",
        place: "Pizza",
        address: "Lina Haven",
        duration: "1-2 hours",
        description: "Vel eum architecto sequi in."
      }],
      afternoon: [{
        position: {
          lat: 62.2932,
          lon: 162.3642
        },
        _id: "5e4abd3dd2f1afc210122bb8",
        place: "Cheese",
        address: "Leffler Rest",
        duration: "30min-1hour",
        description: "Corrupti id illum alias consequuntur ut aut non."
      }],
      _id: "5e4abd3dd2f1afc210122bb6"
    }
  ],
  created_at: "2020-02-17T16:20:14.312Z",
  updated_at: "2020-02-17T16:20:14.312Z",
  __v: 0
}
/* GET home page */
router.get('/', (req, res, next) => {
  const currentUser = req.user;
  res.render('index', {currentUser});
});

router.get('/test', (req, res, next) => {
  res.render('plans' , test)
})

module.exports = router;
