const express = require("express");
const router = express.Router();

const {
    getAllFoods,
    updateFood,
    deleteFood,
    createFood,
    getAllRestaurants,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} = require("../controllers/food");

router.route("/").post(createFood).get(getAllFoods);
router.route("/restaurants").post(createRestaurant).get(getAllRestaurants);
router.route("/:id").delete(deleteFood).patch(updateFood);
router
    .route("/restaurants/:id")
    .patch(updateRestaurant)
    .delete(deleteRestaurant);

module.exports = router;
