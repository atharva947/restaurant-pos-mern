const express = require("express");
const router = express.Router();

const {
    createOrder,
    getOrders,
    completeOrder,
    assignChef
} = require("../controllers/orderController");

router.post("/", createOrder);

router.get("/", getOrders);

router.patch("/:id/complete", completeOrder);

router.patch("/:id/assign", assignChef);

module.exports = router;

