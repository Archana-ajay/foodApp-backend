const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const db = require("../models");
const Food = db.Food;
const Restaurant = db.Restaurant;

//get all foods from databse
const getAllFoods = async (req, res) => {
    const food = await Food.findAll({});
    res.status(StatusCodes.OK).json({ data: food });
};

//create a food
const createFood = async (req, res) => {
    const food = await Food.create({
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
        photoUrl: req.body.photoUrl,
    });
    res.status(StatusCodes.CREATED).json({ data: food });
};

//update a food by id
const updateFood = async (req, res) => {
    const {
        params: { id: foodId },
    } = req;
    const food = await Food.update(req.body, { where: { id: foodId } });
    if (!food) {
        throw new NotFoundError(`No food with id ${foodId}`);
    }
    res.status(StatusCodes.OK).json({ food });
};

//delete a food by id
const deleteFood = async (req, res) => {
    const {
        params: { id: foodId },
    } = req;
    const food = await Food.destroy({
        where: {
            id: foodId,
        },
    });
    if (!food) {
        throw new NotFoundError(`No food with id ${foodId}`);
    }
    res.status(StatusCodes.OK).json({ food });
};

//create food by restaurant
const createRestaurant = async (req, res) => {
    const restaurant = await Restaurant.create({
        categoryId: req.body.categoryId,
        restaurantId: req.body.restaurantID,
        price: req.body.price,
        categoryName: req.body.categoryName,
        description: req.body.description,
        restaurantName: req.body.restaurantName,
        availability: req.body.availability,
        photoUrl: req.body.photoUrl,
        openingHours: req.body.openingHours,
    });
    res.status(StatusCodes.CREATED).json({ data: restaurant });
};

//get all food by restaurant
const getAllRestaurants = async (req, res) => {
    const restaurant = await Restaurant.findAll({});
    res.status(StatusCodes.OK).json({ data: restaurant });
};

//update food by restaurant
const updateRestaurant = async (req, res) => {
    const {
        params: { id: restaurantId },
    } = req;
    const restaurant = await Restaurant.update(req.body, {
        where: { id: restaurantId },
    });
    if (!restaurant) {
        throw new NotFoundError(`No restaurant with id ${restaurantId}`);
    }
    res.status(StatusCodes.OK).json({ restaurant });
};

//delete food by restaurant
const deleteRestaurant = async (req, res) => {
    const {
        params: { id: restaurantId },
    } = req;
    const restaurant = await Restaurant.destroy({
        where: {
            id: restaurantId,
        },
    });
    if (!restaurant) {
        throw new NotFoundError(`No food with id ${restaurantId}`);
    }
    res.status(StatusCodes.OK).json({ restaurant });
};

module.exports = {
    getAllFoods,
    updateFood,
    deleteFood,
    createFood,
    createRestaurant,
    getAllRestaurants,
    updateRestaurant,
    deleteRestaurant,
};
