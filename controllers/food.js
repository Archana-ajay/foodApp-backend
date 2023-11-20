const  Restaurant = require('../model/restaurant');
const Food=require('../model/food')
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');



const getAllFoods = async (req, res) => {
    const food = await Food.find()
    res.status(StatusCodes.OK).json({ data:food });
};


const createFood = async (req, res) => {
    const food = await Food.create({
        categoryId:req.body.categoryId,
        categoryName:req.body.categoryName,
        photoUrl:req.body.photoUrl,
    });
    res.status(StatusCodes.CREATED).json({ data:food });
};



//
const updateFood = async (req, res) => {
    const {
        params: { id: foodId },
    } = req;
    const food = await Food.findOneAndUpdate(
        { _id: foodId},
        req.body,
        { new: true, runValidators: true }
    );
    if (!food) {
        throw new NotFoundError(`No food with id ${foodId}`);
    }
    res.status(StatusCodes.OK).json({ food});
};


const deleteFood = async (req, res) => {
    const {
        params: { id: foodId }
    } = req;
    const food = await Book.findOneAndDelete({
        _id: foodId
    });
    if (!food) {
        throw new NotFoundError(`No food with id ${foodId}`);
    }
    res.status(StatusCodes.OK).json({ food});
};

const createRestaurant = async (req, res) => {
    const restaurant = await Restaurant.create({
        categoryId:req.body.categoryId,
    restaurantID:req.body.restaurantID,
    price:req.body.price,
    categoryName:req.body.categoryName,
    description:req.body.description,
    restaurantName:req.body.restaurantName,
    availability:req.body.availability,
    photoUrl:req.body.photoUrl,
    openingHours:req.body.openingHours
    });
    res.status(StatusCodes.CREATED).json({ data:restaurant });
};

const getAllRestaurants = async (req, res) => {
    const restaurant = await Restaurant.find()
    res.status(StatusCodes.OK).json({ data:restaurant});
};

module.exports = {
    getAllFoods,
    updateFood,
    deleteFood,
    createFood,
    createRestaurant,
    getAllRestaurants

};


