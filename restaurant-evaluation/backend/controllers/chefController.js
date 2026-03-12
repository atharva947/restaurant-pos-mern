const Chef = require("../models/Chef");

exports.createChefs = async (req, res) => {
    try {

        const existingChefs = await Chef.countDocuments();

        if (existingChefs > 0) {
            return res.status(400).json({ message: "Chefs already exist" });
        }

        const chefs = [
            { name: "Chef A" },
            { name: "Chef B" },
            { name: "Chef C" },
            { name: "Chef D" }
        ];

        await Chef.insertMany(chefs);

        res.json({ message: "4 chefs created successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getChefs = async (req, res) => {
    try {

        const chefs = await Chef.find();

        res.json(chefs);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};