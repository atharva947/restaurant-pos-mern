const express = require("express");
const router = express.Router();

const {
    getDashboardStats,
    getOrderSummary,
    getRevenueData,
    getChefPerformance
} = require("../controllers/analyticsController");

router.get("/dashboard", getDashboardStats);

router.get("/order-summary", getOrderSummary);

router.get("/revenue", getRevenueData);

router.get("/chef-performance", getChefPerformance);

module.exports = router;