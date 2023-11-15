const User = require('../model/user');
const mongoose=require('mongoose')
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError,NotFoundError} = require('../errors');

const addCart = async (req, res) => {
    let {
        foodId,
        quantity
    } = req.body;
    const userId = req.user.userId
    const user = await User.findById(userId);

    if (!user) {
        throw new NotFoundError("user not found");
      }

    // Check if the item with the given foodId is already in the cart
    const existingCartItemIndex = user.cart.items.findIndex(
        item => item.foodId.toString() === foodId
      );

      // If the item exists, update the quantity
    if (existingCartItemIndex !== -1) {
        user.cart.items[existingCartItemIndex].quantity += quantity;
      } else {
        // If the item does not exist, add a new item to the cart
        user.cart.items.push({
          foodId: foodId,
          quantity:quantity
        });
      }
       // Save the updated user with the new cart
    await user.save();

    res.status(StatusCodes.OK).json({ message :'Item added to the cart successfully'});
};

module.exports = {
    addCart}