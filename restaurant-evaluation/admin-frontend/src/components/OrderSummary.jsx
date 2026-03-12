import { useEffect, useState } from "react";
import { getOrderSummary } from "../services/api";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function OrderSummary() {

    const [period, setPeriod] = useState("daily");

    const [summary, setSummary] = useState({
        served: 0,
        dineIn: 0,
        takeAway: 0
    });

    useEffect(() => {
        fetchSummary();
    }, [period]);

    const fetchSummary = async () => {
        const data = await getOrderSummary(period);
        setSummary(data);
    };
    const chartData = [
        { name: "Served", value: summary.served },
        { name: "Dine In", value: summary.dineIn },
        { name: "Take Away", value: summary.takeAway }
    ];

    const COLORS = [
        "#9CA3AF",
        "#6B7280",
        "#111827"
    ];
    const total =
        summary.served + summary.dineIn + summary.takeAway;

    const servedPercent = (summary.served / total) * 100 || 0;
    const dinePercent = (summary.dineIn / total) * 100 || 0;
    const takePercent = (summary.takeAway / total) * 100 || 0;
    return (
        <div className="order-summary">

            <div className="summary-header">

                <h3>Order Summary</h3>

                <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>

            </div>

            <div className="summary-cards">

                <div className="summary-card">
                    <p>Served</p>
                    <h2>{summary.served}</h2>
                </div>

                <div className="summary-card">
                    <p>Dine In</p>
                    <h2>{summary.dineIn}</h2>
                </div>

                <div className="summary-card">
                    <p>Take Away</p>
                    <h2>{summary.takeAway}</h2>
                </div>

            </div>
            <div className="summary-chart-section">

                <div className="summary-chart">

                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                </div>

                <div className="summary-bars">

                    <div className="bar-row">
                        <span>Take Away ({Math.round(takePercent)}%)</span>
                        <div className="progress-bar">
                            <div
                                className="bar-takeaway"
                                style={{ width: `${takePercent}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bar-row">
                        <span>Served ({Math.round(servedPercent)}%)</span>
                        <div className="progress-bar">
                            <div
                                className="bar-served"
                                style={{ width: `${servedPercent}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bar-row">
                        <span>Dine In ({Math.round(dinePercent)}%)</span>
                        <div className="progress-bar">
                            <div
                                className="bar-dinein"
                                style={{ width: `${dinePercent}%` }}
                            ></div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default OrderSummary;