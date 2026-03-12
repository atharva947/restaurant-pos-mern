const mongoose = require("mongoose");

const chefSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    activeOrders: {
        type: Number,
        default: 0
    },

    totalOrdersHandled: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

module.exports = mongoose.model("Chef", chefSchema);