import { useEffect, useState } from "react";
import { getMenuItems, createMenuItem, deleteMenuItem, updateMenuItem } from "../services/api";

function Menu() {

    const [searchTerm, setSearchTerm] = useState("");

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        const data = await getMenuItems();
        setMenuItems(data);
    };

    const getImage = (category) => {

        if (category === "Pizza")
            return "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

        if (category === "Burger")
            return "https://images.unsplash.com/photo-1550547660-d9450f859349";

        if (category === "Pasta")
            return "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9";

        if (category === "Sides")
            return "https://images.unsplash.com/photo-1573080496219-bb080dd4f877";

        if (category === "Beverage")
            return "https://images.unsplash.com/photo-1642647391072-6a2416f048e5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sZCUyMGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D";

        return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";

    };

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async () => {

        const data = {
            name,
            description,
            price,
            averagePreparationTime: prepTime,
            category,
            stock
        };

        if (editingItem) {

            await updateMenuItem(editingItem._id, data);

        } else {

            await createMenuItem(data);

        }

        fetchMenuItems();

        setShowModal(false);
        setEditingItem(null);

        setName("");
        setDescription("");
        setPrice("");
        setPrepTime("");
        setCategory("");
        setStock("");

    };

    const [openMenuId, setOpenMenuId] = useState(null);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Delete this item?");

        if (!confirmDelete) return;

        await deleteMenuItem(id);

        fetchMenuItems();

    };

    const [editingItem, setEditingItem] = useState(null);

    const handleEdit = (item) => {

        setEditingItem(item);

        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setPrepTime(item.averagePreparationTime);
        setCategory(item.category);
        setStock(item.stock);

        setShowModal(true);

    };
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    return (

        <div className="page-container">
            <div className="menu-header">
                <input
                    className="menu-search"
                    placeholder="Search menu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="menu-top">

                <h1>Menu</h1>

                <button
                    className="add-menu-btn"
                    onClick={() => setShowModal(true)}
                >
                    + Add Item
                </button>

            </div>
            <div className="menu-grid">

                {menuItems
                    .filter((item) =>
                        item.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item) => (
                        <div className="menu-card" key={item._id}>
                            <div className="menu-card-header">
                                <img
                                    className="menu-image"
                                    src={getImage(item.category)}
                                    alt={item.name}
                                />
                                <div className="menu-options">

                                    <button
                                        className="menu-dots"
                                        onClick={() =>
                                            setOpenMenuId(openMenuId === item._id ? null : item._id)
                                        }
                                    >
                                        ⋯
                                    </button>

                                    {openMenuId === item._id && (

                                        <div className="menu-dropdown">

                                            <button onClick={() => handleEdit(item)}>
                                                Edit
                                            </button>

                                            <button onClick={() => handleDelete(item._id)}>
                                                Delete
                                            </button>

                                        </div>

                                    )}

                                </div>
                            </div>
                            <div className="menu-info">

                                <p><b>Name:</b> {item.name}</p>

                                <p><b>Description:</b> {item.description}</p>

                                <p><b>Price:</b> {item.price}</p>

                                <p>
                                    <b>Average Prep Time:</b> {item.averagePreparationTime} Mins
                                </p>

                                <p><b>Category:</b> {item.category}</p>

                                <p>
                                    <b>InStock:</b> {item.stock > 0 ? "Yes" : "No"}
                                </p>

                                <p><b>Rating:</b> 4.5 ⭐</p>

                            </div>

                        </div>

                    ))}

            </div>
            {showModal && (

                <div className="modal-overlay">

                    <div className="menu-modal">

                        <div className="modal-header">

                            <h2>{editingItem ? "Edit Menu Item" : "Add Menu Item"}</h2>

                            <button
                                className="modal-close"
                                onClick={() => setShowModal(false)}
                            >
                                ✕
                            </button>

                        </div>

                        <div className="modal-body">

                            <input
                                placeholder="Item Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <input
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />

                            <input
                                placeholder="Prep Time"
                                value={prepTime}
                                onChange={(e) => setPrepTime(e.target.value)}
                            />

                            <input
                                placeholder="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />

                            <input
                                placeholder="Stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div className="modal-footer">

                            <button
                                className="cancel-btn"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>

                            <button className="submit-btn"
                                onClick={handleSubmit}>
                                Add Item
                            </button>

                        </div>

                    </div>

                </div>

            )}


        </div>

    );



}

export default Menu;