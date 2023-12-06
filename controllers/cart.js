const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const { BadRequestError, NotFoundError } = require("../errors");

const db = require("../models");
const User = db.User;
const Cart = db.Cart;
const Restaurant = db.Restaurant;

//add item to cart
const addCart = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors
            .array()
            .map((error) => `${error.msg}`)
            .join(",");
        throw new BadRequestError(errorMessages);
    }
    let { restaurantID, quantity } = req.body;
    const userId = req.user.userId;
    const user = await User.findByPk(userId);
    if (!user) {
        throw new NotFoundError("User not found");
    }

    const restaurant = await Restaurant.findByPk(restaurantID);
    if (!restaurant) {
        throw new NotFoundError("Restaurant not found");
    }

    const existingCartItem = await Cart.findOne({
        where: {
            userId: userId,
            restaurantId: restaurantID,
        },
    });

    if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
    } else {
        await Cart.create({
            restaurantId: restaurantID,
            quantity,
            userId,
        });
    }

    res.status(StatusCodes.OK).json({
        message: "Item added to the cart successfully",
        cart: user.carts,
    });
};

//get cart items
const getCart = async (req, res) => {
    const userId = req.user.userId;
    const user = await Cart.findAll({
        where: { userId: userId },
        include: [{ model: Restaurant }],
    });

    if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        return;
    }

    res.status(StatusCodes.OK).json({ data: user });
};

//remove item from cart
const removeCart = async (req, res) => {
    const userId = req.user.userId;
    const restaurantID = req.params.restaurantID;

    const user = await User.findByPk(userId);

    if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        return;
    }

    const deletedCartItem = await Cart.destroy({
        where: {
            userId: userId,
            restaurantId: restaurantID,
        },
    });

    if (deletedCartItem) {
        res.status(StatusCodes.OK).json({
            message: "Item removed from the cart successfully",
        });
    } else {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "Item not found in the cart",
        });
    }
};

module.exports = {
    addCart,
    getCart,
    removeCart,
};
