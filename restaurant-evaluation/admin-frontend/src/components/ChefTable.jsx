import { useEffect, useState } from "react";

function ChefTable() {

    const [chefs, setChefs] = useState([]);

    useEffect(() => {
        fetchChefs();
    }, []);

    const fetchChefs = async () => {

        const res = await fetch("https://restaurant-pos-mern-1.onrender.com/api/analytics/chef-performance");
        const data = await res.json();

        setChefs(data);

    };

    return (

        <div>

            <h3>Chef Performance</h3>

            <table className="chef-table">

                <thead>

                    <tr>
                        <th>Chef Name</th>
                        <th>Orders Taken</th>
                    </tr>

                </thead>

                <tbody>

                    {chefs.map(chef => (
                        <tr key={chef._id}>
                            <td>{chef.name}</td>
                            <td>{chef.totalOrdersHandled}</td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default ChefTable;