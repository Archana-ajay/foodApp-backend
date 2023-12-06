const express = require("express");
const router = express.Router();
const { validateCart } = require("../validators/authValidator");
const { addCart, getCart, removeCart } = require("../controllers/cart");

router.post("/cart", validateCart, addCart);
router.get("/cart", getCart);
router.delete("/remove/:restaurantID", removeCart);

module.exports = router;
