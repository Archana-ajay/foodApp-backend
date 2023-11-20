const express = require('express');
const router = express.Router();

const { addCart,getCart,removeCart } = require('../controllers/cart');


router.post('/cart', addCart);
router.get('/cart', getCart);
router.delete('/remove/:restaurantID', removeCart);


module.exports = router;