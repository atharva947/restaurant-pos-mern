const Order = require("../models/Order");
const Client = require("../models/Client");
const Chef = require("../models/Chef");
exports.getDashboardStats = async (req, res) => {
  try {

    const totalOrders = await Order.countDocuments();

    const totalClients = await Client.countDocuments();

    const totalChefs = await Chef.countDocuments();

    const totalRevenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalRevenue = totalRevenueData[0]?.totalRevenue || 0;

    res.json({
      totalOrders,
      totalRevenue,
      totalClients,
      totalChefs
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderSummary = async (req, res) => {
  try {

    const { period } = req.query;

    const now = new Date();
    let startDate;

    if (period === "daily") {
      startDate = new Date(now.setHours(0, 0, 0, 0));
    }

    else if (period === "weekly") {
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
    }

    else if (period === "monthly") {
      startDate = new Date();
      startDate.setMonth(now.getMonth() - 1);
    }

    const orders = await Order.find({
      createdAt: { $gte: startDate }
    });

    const served = orders.filter(o => o.status === "SERVED").length;

    const dineIn = orders.filter(o => o.orderType === "DINE_IN").length;

    const takeAway = orders.filter(o => o.orderType === "TAKEAWAY").length;

    res.json({
      served,
      dineIn,
      takeAway
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRevenueData = async (req, res) => {

  try {

    const { period } = req.query;

    const now = new Date();
    let startDate;

    if (period === "daily") {
      startDate = new Date(now.setHours(0, 0, 0, 0));
    }

    else if (period === "weekly") {
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
    }

    else if (period === "monthly") {
      startDate = new Date();
      startDate.setMonth(now.getMonth() - 1);
    }

    const revenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          revenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    res.json(revenue);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

exports.getChefPerformance = async (req, res) => {

  try {

    const chefs = await Chef.find().select("name totalOrdersHandled");

    res.json(chefs);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

};