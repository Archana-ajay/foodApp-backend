const { StatusCodes } = require('http-status-codes');

const db=require('../models')
const User=db.User
const Cart=db.Cart
const Restaurant=db.Restaurant




const addCart = async (req, res) => {
  let {
    restaurantID,
      quantity
  } = req.body;
  const userId = req.user.userId
  const user = await User.findByPk(userId);
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
      return;
    }

    const restaurant = await Restaurant.findByPk(restaurantID);
    if (!restaurant) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Restaurant not found' });
    }

   // Check if the restaurant with given id already exist or not
   const existingCartItem = await Cart.findOne({
    where: {
      userId:userId,
      restaurantId:restaurantID,
    },
  });

  if (existingCartItem) {
    // If the product already exists, update the quantity
    existingCartItem.quantity += quantity;
    await existingCartItem.save();
  } else {
    // If the product does not exist, add a new item to the cart
    await Cart.create({
      restaurantId:restaurantID,
      quantity,
      userId,
    });
  }

  res.status(StatusCodes.OK).json({ message: 'Item added to the cart successfully', cart: user.carts });
};

const getCart = async (req, res) => {

  const userId = req.user.userId
  const user = await Cart.findAll(
    {
      where: { userId: userId },
      include: [{ model: Restaurant }],
    }
  )
  
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    return;
  }

  res.status(StatusCodes.OK).json({ data: user });

};

const removeCart = async (req, res) => {
const userId = req.user.userId;
const restaurantID = req.params.restaurantID; 

const user = await User.findByPk(userId);

if (!user) {
  res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
  return;
}

const deletedCartItem = await Cart.destroy({
  where: {
    userId:userId,
    restaurantId:restaurantID,
  },
});

if (deletedCartItem) {
  res.status(StatusCodes.OK).json({ message: 'Item removed from the cart successfully' });
} else {
  res.status(StatusCodes.NOT_FOUND).json({ message: 'Item not found in the cart' });
}
};
module.exports = {
  addCart,
  getCart,
removeCart}