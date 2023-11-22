const User = require('../model/user');
const Order = require('../model/order');

const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

//to create an order
const postOrder = async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await User.findById(userId).populate('cart.items.restaurantID');
      
      if (!user) {
        throw new NotFoundError('User not found');
      }
  
      
      const orderTotal = user.cart.items.reduce((total, item) => {
        const food = item.restaurantID; 
        return total + item.quantity * food.price;
      }, 0);
  
      // Create the order
      const orderItems = user.cart.items.map(item => ({
        restaurantID: item.restaurantID._id, // Assuming product details are populated
        quantity: item.quantity,
        price: item.restaurantID.price,
      }));
  
      const order = new Order({
        userId: userId,
        items: orderItems,
        total: orderTotal,
      });
  
      // Save the order to the database
      await order.save();
  
      // Clear the user's cart after placing the order
      user.cart.items = [];
      await user.save();
  
      res.status(StatusCodes.CREATED).json({ message: 'Order placed successfully', order });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  };
  
  //  to get order summary
  const getOrder = async (req, res) => {
    try {
      const userId = req.user.userId;
      const orders = await Order.find({ userId }).populate('items.restaurantID');
  
      res.status(StatusCodes.OK).json({ data: orders });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  };
  
  
  
  
  module.exports = {
    
    postOrder,
    getOrder
  }