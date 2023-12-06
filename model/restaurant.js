const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    restaurantID: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    restaurantName: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        required: true,
    },
    photoUrl: {
        type: String,
        required: true,
    },
    openingHours: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
