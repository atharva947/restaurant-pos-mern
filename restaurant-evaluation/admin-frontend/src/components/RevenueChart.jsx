import { useEffect, useState } from "react";
import { getRevenueData } from "../services/api";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function RevenueChart() {

    const [period, setPeriod] = useState("weekly");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchRevenue();
    }, [period]);

    const fetchRevenue = async () => {

        const revenue = await getRevenueData(period);


        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    
        let weekData = days.map(day => ({
            label: day,
            revenue: 0
        }));

    
        revenue.forEach(item => {
            const dayIndex = item._id - 1;
            weekData[dayIndex].revenue = item.revenue;
        });

        setData(weekData);

        

    };

    return (

        <div className="revenue-chart">

            <div className="chart-header">

                <h3>Revenue</h3>

                <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>

            </div>

            <ResponsiveContainer width="100%" height={250}>

                <LineChart data={data}>

                    <XAxis dataKey="label" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#6c5ce7"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );
}

export default RevenueChart;