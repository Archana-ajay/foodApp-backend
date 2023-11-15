const express = require('express');
const router = express.Router();


const {
   getAllFoods,
   getFood,
   updateFood,
   deleteFood,
   createFood
} = require('../controllers/food');

router
    .route('/')
    .post(createFood)
    .get(getAllFoods);
router
    .route('/category')
    .get(getFood);
router.route('/:id').delete(deleteFood).patch(updateFood);

module.exports = router;