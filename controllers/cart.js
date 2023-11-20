const User = require('../model/user');

const { StatusCodes } = require('http-status-codes');


const addCart = async (req, res) => {
  let {
    restaurantID,
      quantity
  } = req.body;
  const userId = req.user.userId
  const user = await User.findById(userId);

  if (!user) {
      throw new NotFoundError("user not found");
    }

  // Check if the item with the given foodId is already in the cart
  const existingCartItemIndex = user.cart.items.findIndex(
      item => item.restaurantID.toString() === restaurantID
    );

    // If the item exists, update the quantity
  if (existingCartItemIndex !== -1) {
      user.cart.items[existingCartItemIndex].quantity += quantity;
    } else {
      // If the item does not exist, add a new item to the cart
      user.cart.items.push({
        restaurantID: restaurantID,
        quantity:quantity
      });
    }
     // Save the updated user with the new cart
  await user.save();

  res.status(StatusCodes.OK).json({ message :'Item added to the cart successfully',cart:user.cart.items});
};

const getCart = async (req, res) => {

const food = await User.findById(req.user.userId).populate('cart.items.restaurantID');
console.log(food.cart)

res.status(StatusCodes.OK).json({ data:food.cart});

};

const removeCart = async (req, res) => {
const userId = req.user.userId;
const restaurantID = req.params.restaurantID; 

try {
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const existingCartItemIndex = user.cart.items.findIndex(
    (item) => item.restaurantID.toString() === restaurantID
  );
  console.log(existingCartItemIndex);

  if (existingCartItemIndex !== -1) {
    // If the item exists in the cart, remove it
    user.cart.items.splice(existingCartItemIndex, 1);
    await user.save();
    res.status(StatusCodes.OK).json({ message: 'Item removed from the cart successfully' });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'Item not found in the cart' });
  }
} catch (error) {

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
}
};
module.exports = {
  addCart,
  getCart,
removeCart}