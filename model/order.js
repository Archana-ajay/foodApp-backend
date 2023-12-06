const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            restaurantID: {
                type: mongoose.Types.ObjectId,
                ref: "Restaurant",
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
});

module.exports = mongoose.model("Order", OrderSchema);
