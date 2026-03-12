import { FaTrash } from "react-icons/fa";

function TableCard({ table, onDelete }) {

    return (

        <div className="table-card">

            <div
                className="table-delete"
                onClick={() => {
                    if (window.confirm("Delete this table?")) {
                        onDelete(table._id);
                    }
                }}
            >
                <FaTrash />
            </div>

            <p>Table</p>

            <h2>{table.tableNumber}</h2>

            <div className="table-info">
                <span className="chair-icon">🪑</span>
                <span>{table.capacity}</span>
            </div>
        </div>

    );

}

export default TableCard;