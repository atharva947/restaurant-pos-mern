const express = require("express");
const cors = require("cors");
const menuRoutes = require("./routes/menuRoutes");
const tableRoutes = require("./routes/tableRoutes");
const chefRoutes = require("./routes/chefRoutes");
const orderRoutes = require("./routes/orderRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const connectDB = require("./config/db");

const app = express();

// connect database
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/menu", menuRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/chefs", chefRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Backend API Running");
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});