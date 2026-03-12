import { useEffect, useState } from "react";
import TableCard from "../components/TableCard";
import { getTables } from "../services/api";
import AddTableModal from "../components/AddTableModal";

function Tables() {

    const [tables, setTables] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        const data = await getTables();
        setTables(data);
    };

    const deleteTable = async (id) => {

        await fetch(`http://localhost:4000/api/tables/${id}`, {
            method: "DELETE"
        });

        fetchTables(); // refresh tables after delete
    };

    const createTable = async (data) => {

        await fetch("http://localhost:4000/api/tables", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        fetchTables();
    };

    return (

        <div className="page-container">

            <h1>Tables</h1>

            <div className="tables-grid-page">

                {tables.map(table => (

                    <TableCard
                        key={table._id}
                        table={table}
                        onDelete={deleteTable}
                    />

                ))}

                <div
                    className="add-table-card"
                    onClick={() => setShowModal(true)}
                >
                    +
                </div>

            </div>

            {showModal && (
                <AddTableModal
                    onClose={() => setShowModal(false)}
                    onCreate={createTable}
                />
            )}

        </div>

    );

}

export default Tables;