const express = require('express');
const router = express.Router();


const {
   getAllFoods,
   updateFood,
   deleteFood,
   createFood,
   getAllRestaurants,
   createRestaurant
} = require('../controllers/food');

router
    .route('/')
    .post(createFood)
    .get(getAllFoods);
    router
    .route('/restaurants')
    .post(createRestaurant)
    .get(getAllRestaurants);
router.route('/:id').delete(deleteFood).patch(updateFood);

module.exports = router;