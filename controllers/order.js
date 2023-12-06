const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const db = require("../models");
const Order = db.Order;
const Restaurant = db.Restaurant;
const Cart = db.Cart;

//to create an order
const postOrder = async (req, res) => {
    const userId = req.user.userId;
    const cartItems = await Cart.findAll({
        where: { userId: userId },
        include: [{ model: Restaurant }],
    });

    if (!cartItems || cartItems.length === 0) {
        throw new NotFoundError("User not found or cart is empty");
    }

    // Calculate the total price of the items in the cart
    const orderTotal = cartItems.reduce((total, cart) => {
        const restaurant = cart.Restaurant;
        return total + cart.quantity * restaurant.price;
    }, 0);

    // Create the order items
    const orderItems = cartItems.map((cart) => ({
        restaurantId: cart.restaurantID,
        quantity: cart.quantity,
        price: cart.Restaurant.price,
        foodName: cart.Restaurant.description,
        restaurantName: cart.Restaurant.restaurantName,
    }));

    // Create the order
    const order = await Order.create({
        userId: userId,
        items: orderItems,
        total: orderTotal,
    });

    // Clear the user's cart after placing the order
    await Cart.destroy({ where: { userId } });
    res.status(StatusCodes.CREATED).json({
        message: "Order placed successfully",
        order,
    });
};

//  to get order summary
const getOrder = async (req, res) => {
    const userId = req.user.userId;

    const orders = await Order.findAll({
        where: { userId: userId },
    });

    res.status(StatusCodes.OK).json({ orders });
};

module.exports = {
    postOrder,
    getOrder,
};
