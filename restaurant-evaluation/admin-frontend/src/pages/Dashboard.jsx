import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/api";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import OrderSummary from "../components/OrderSummary";
import RevenueChart from "../components/RevenueChart";
import TablePreview from "../components/TablePreview";
import ChefTable from "../components/ChefTable";
import chefIcon from "../assets/icons/chef.png";
import revenueIcon from "../assets/icons/revenue.png";
import ordersIcon from "../assets/icons/orders.png";
import clientsIcon from "../assets/icons/clients.png";

function Dashboard() {

    const [filterText, setFilterText] = useState("");

    const shouldBlur = (keyword) => {
        if (!filterText) return false;
        return !keyword.includes(filterText.toLowerCase());
    };

    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalClients: 0,
        totalChefs: 0
    });

    const fetchData = async () => {

        try {

            const ordersRes = await fetch("http://localhost:4000/api/orders");
            const ordersData = await ordersRes.json();

            const chefsRes = await fetch("http://localhost:4000/api/chefs");
            const chefsData = await chefsRes.json();

            const tablesRes = await fetch("http://localhost:4000/api/tables");
            const tablesData = await tablesRes.json();

            setStats({
                totalChefs: chefsData.length,

                totalOrders: ordersData.length,

                totalRevenue: ordersData.reduce(
                    (sum, order) => sum + order.totalAmount,
                    0
                ),

                totalClients: new Set(
                    ordersData.map(order => order.client?._id)
                ).size
            });

        } catch (error) {
            console.log(error);
        }

    };
    useEffect(() => {

        fetchData();

        const interval = setInterval(fetchData, 3000);

        return () => clearInterval(interval);

    }, []);

    const fetchStats = async () => {
        const data = await getDashboardStats();
        setStats(data);
    };
    console.log(filterText);

    return (
        <div className="page-container">
            <div className="dashboard-filter">
                <div className="filter-box">
                    🔍
                    <input
                        placeholder="Search metrics..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                    <div className="filter-arrow">▾</div>
                </div>
            </div>
            <h1>Analytics</h1>

            <div className="stats-grid">

                <div className={shouldBlur("chefs") ? "blur" : ""}>
                    <StatCard
                        icon={<img src={chefIcon} className="stat-icon" />}
                        title="Total Chefs"
                        value={stats.totalChefs}
                    />
                </div>

                <div className={shouldBlur("revenue") ? "blur" : ""}>
                    <StatCard
                        icon={<img src={revenueIcon} className="stat-icon" />}
                        title="Total Revenue"
                        value={`₹ ${stats.totalRevenue}`}
                    />
                </div>

                <div className={shouldBlur("orders") ? "blur" : ""}>
                    <StatCard
                        icon={<img src={ordersIcon} className="stat-icon" />}
                        title="Total Orders"
                        value={stats.totalOrders}
                    />
                </div>

                <div className={shouldBlur("clients") ? "blur" : ""}>
                    <StatCard
                        icon={<img src={clientsIcon} className="stat-icon" />}
                        title="Total Clients"
                        value={stats.totalClients}
                    />
                </div>

            </div>
            <div className="dashboard-grid">

                <div className={shouldBlur("order summary") ? "blur" : ""}>
                    <div className="grid-item">
                        <OrderSummary />
                    </div>
                </div>


                <div className={shouldBlur("revenue chart") ? "blur" : ""}>
                    <div className="grid-item">
                        <RevenueChart />
                    </div>
                </div>

                <div className={shouldBlur("tables") ? "blur" : ""}>
                    <div className="grid-item">
                        <TablePreview />
                    </div>
                </div>
            </div>
            <div className={shouldBlur("chefs") ? "blur" : ""}>
                <div className="chef-section">
                    <ChefTable />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;