
import { useState } from "react";

function AddTableModal({ onClose, onCreate }) {

    const [chairs, setChairs] = useState(2);
    const [name, setName] = useState("");

    const handleCreate = () => {
        onCreate({
            name,
            chairs
        });
        onClose();
    };

    return (
        <div className="modal-overlay">

            <div className="modal">

                <h3>Table name (optional)</h3>

                <input
                    type="text"
                    placeholder="Table name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <p>Chair</p>

                <select
                    value={chairs}
                    onChange={(e) => setChairs(e.target.value)}
                >
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                    <option value={6}>6</option>
                    <option value={8}>8</option>
                </select>

                <button onClick={handleCreate}>
                    Create
                </button>

            </div>

        </div>
    );
}

export default AddTableModal;