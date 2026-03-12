const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    orderId: {
        type: String,
        required: true,
        unique: true
    },

    orderType: {
        type: String,
        enum: ["DINE_IN", "TAKEAWAY"],
        required: true
    },

    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table"
    },

    chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chef"
    },

    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },

    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MenuItem"
            },

            quantity: Number,

            price: Number
        }
    ],

    totalAmount: Number,

    status: {
        type: String,
        enum: ["PENDING", "PREPARING", "SERVED"],
        default: "PENDING"
    },

    processingTimeRemaining: Number

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);