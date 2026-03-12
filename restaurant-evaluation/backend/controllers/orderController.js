const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const Chef = require("../models/Chef");
const Client = require("../models/Client");
const Table = require("../models/Table");

exports.assignChef = async (req, res) => {
    try {

        const { chefId } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.chef = chefId;
        if (order.status === "PENDING") {
            order.status = "PREPARING";
        }

        await order.save();

        res.json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createOrder = async (req, res) => {
    try {

        const { orderType, tableId, clientData, items } = req.body;

        let table = null;

        if (orderType === "DINE_IN") {

            table = await Table.findOne({ isReserved: false });

            if (!table)
                return res.status(404).json({ message: "No table available" });

            table.isReserved = true;
            await table.save();
        }
        const client = await Client.create(clientData);

        // const chef = await assignChef();
        // find chef with least active orders
        const chef = await Chef.findOne().sort({ activeOrders: 1 });
        chef.activeOrders += 1;
        await chef.save();

        let totalAmount = 0;
        let maxPrepTime = 0;

        const orderItems = [];

        for (const item of items) {

            const menuItem = await MenuItem.findById(item.menuItemId);

            if (!menuItem)
                return res.status(404).json({ message: "Menu item not found" });

            const itemTotal = menuItem.price * item.quantity;

            totalAmount += itemTotal;

            maxPrepTime = Math.max(
                maxPrepTime,
                menuItem.averagePreparationTime
            );

            orderItems.push({
                menuItem: menuItem._id,
                quantity: item.quantity,
                price: menuItem.price
            });

        }

        const order = await Order.create({

            orderId: "ORD" + Date.now(),

            orderType,

            table: table ? table._id : null,

            chef: chef._id,

            client: client._id,

            items: orderItems,

            totalAmount,

            status: "PENDING",

            processingTimeRemaining: maxPrepTime

        });

        res.json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("chef")
            .populate("table")
            .populate("client")
            .populate("items.menuItem");

        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.completeOrder = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);

        if (!order)
            return res.status(404).json({ message: "Order not found" });

   
        order.status = "SERVED";
        await order.save();

       
        if (order.chef) {
            const chef = await Chef.findById(order.chef);

            chef.activeOrders -= 1;
            chef.totalOrdersHandled += 1;

            await chef.save();
        }

    
        if (order.table) {
            const table = await Table.findById(order.table);

            table.isReserved = false;

            await table.save();
        }

        res.json({ message: "Order completed successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};