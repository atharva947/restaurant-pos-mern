import { useEffect, useState } from "react";
import { getTables } from "../services/api";

function TablePreview() {

    const [tables, setTables] = useState([]);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        const data = await getTables();
        setTables(data);
    };

    return (

        <div>

            <h3>Tables</h3>

            <div className="table-legend">

                <span className="legend reserved-dot"></span> Reserved
                <span className="legend available-dot"></span> Available

            </div>

            <div className="tables-grid">

                {tables.map(table => (
                    <div
                        key={table._id}
                        className={`table-box ${table.isReserved ? "reserved" : ""}`}
                    >
                        Table {table.tableNumber}
                    </div>
                ))}

            </div>

        </div>

    );
}

export default TablePreview;