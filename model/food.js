const mongoose = require("mongoose");

// Define the Food Schema
const foodSchema = new mongoose.Schema({
    categoryId: Number,
    categoryName: String,
    photoUrl: String,
});

module.exports = mongoose.model("Food", foodSchema);
