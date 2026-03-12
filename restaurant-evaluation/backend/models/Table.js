const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true
    },

    capacity: {
        type: Number,
        required: true,
        enum: [2, 4, 6, 8]
    },

    isReserved: {
        type: Boolean,
        default: false
    },

    tableName: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model("Table", tableSchema);