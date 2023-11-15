const  Food = require('../model/food');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');


//retrieve the books created by user from database
const getAllFoods = async (req, res) => {
    // const features = new APIFeatures(
    //     Book.find({ createdBy: req.user.userId }),
    //     req.query
    // ).paginate();
    const food = await Food.find()
    const data = food.map(food => ({
        categoryId: food.categoryId,
        categoryName: food.categoryName,
        photoUrl: food.photoUrl
      }));
    res.status(StatusCodes.OK).json({ data });
};

//create book and save it in the databse
const createFood = async (req, res) => {
    const food = await Food.create({
        restaurantId:req.body.restaurantId,
        price:req.body.price,
        categoryName:req.body.categoryName,
        description:req.body.description,
        restaurantName:req.body.restaurantName,
        availability:req.body.availability,
        photoUrl:req.body.photoUrl,
        openingHours:req.body.openingHours,
        categoryId:req.body.categoryId

    });
    res.status(StatusCodes.CREATED).json({ food });
};

//find foods available 
const getFood = async (req, res) => {
    const {
        query: { categoryName: categoryName },
    } = req;
    const food = await Food.find({categoryName:categoryName})
    res.status(StatusCodes.OK).json({ food });
};

//update a book in database
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

//delete a book from database
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

module.exports = {
    getAllFoods,
    getFood,
    updateFood,
    deleteFood,
    createFood

};