const Table = require("../models/Table");


// CREATE TABLE
exports.createTable = async (req, res) => {
    try {

        const { chairs, name } = req.body;

        // find last table number
        const lastTable = await Table.findOne().sort({ tableNumber: -1 });

        const newNumber = lastTable ? lastTable.tableNumber + 1 : 1;

        const table = new Table({
            tableNumber: newNumber,
            capacity: chairs,
            tableName: name
        });

        await table.save();

        res.status(201).json(table);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// GET TABLES
exports.getTables = async (req, res) => {
    try {

        const tables = await Table.find().sort({ tableNumber: 1 });

        res.json(tables);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// TOGGLE RESERVATION
exports.toggleReservation = async (req, res) => {
    try {

        const table = await Table.findById(req.params.id);

        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }

        table.isReserved = !table.isReserved;

        await table.save();

        res.json(table);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// DELETE TABLE
exports.deleteTable = async (req, res) => {
    try {

        const table = await Table.findById(req.params.id);

        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }

        if (table.isReserved) {
            return res.status(400).json({ message: "Reserved tables cannot be deleted" });
        }

        await Table.findByIdAndDelete(req.params.id);

        // reorder numbers
        const tables = await Table.find().sort({ tableNumber: 1 });

        for (let i = 0; i < tables.length; i++) {
            tables[i].tableNumber = i + 1;
            await tables[i].save();
        }

        res.json({ message: "Table deleted and numbering updated" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};