import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import { useNavigate } from "react-router-dom";
import burgerIcon from "../assets/icons/burger.png";
import pizzaIcon from "../assets/icons/pizza.png";
import drinkIcon from "../assets/icons/drink.png";
import friesIcon from "../assets/icons/fries.png";
import veggiesIcon from "../assets/icons/veggies.png";

function Menu({ cart, setCart }) {

    const [menu, setMenu] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = [
        { name: "All", icon: null },
        { name: "Burger", icon: burgerIcon },
        { name: "Pizza", icon: pizzaIcon },
        { name: "Drink", icon: drinkIcon },
        { name: "French Fries", icon: friesIcon },
        { name: "Veggies", icon: veggiesIcon }
    ];

    useEffect(() => {

        fetch("https://restaurant-pos-mern-1.onrender.com/api/menu")
            .then(res => res.json())
            .then(data => setMenu(data));

    }, [])

    const navigate = useNavigate();


    const addToCart = (item) => {

        const existing = cart.find(i => i._id === item._id);

        if (existing) {

            setCart(
                cart.map(i =>
                    i._id === item._id
                        ? { ...i, qty: i.qty + 1 }
                        : i
                )
            )

        } else {

            setCart([...cart, { ...item, qty: 1 }])

        }

    }
    const filteredMenu = menu.filter(item => {

        const matchesSearch =
            item.name.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            item.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    const recommendedItems = [...menu]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    return (

        <div>

            <h2>Good evening</h2>
            <p>Place your order here</p>

            <input
                className="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="category-bar">

                {categories.map((cat) => (

                    <div
                        key={cat.name}
                        className={`category-card ${selectedCategory === cat.name ? "active" : ""
                            }`}
                        onClick={() => setSelectedCategory(cat.name)}
                    >

                        {cat.icon && (
                            <img src={cat.icon} className="category-icon" />
                        )}

                        <span>{cat.name}</span>

                    </div>

                ))}

            </div>

            <div className="menu-grid">

                {filteredMenu.map(item => (
                    <MenuCard key={item._id} item={item} addToCart={addToCart} />
                ))}

            </div>
            {filteredMenu.length === 0 && (

                <div className="no-results">

                    <h3>No items found</h3>

                    <p>Recommended items</p>

                    <div className="menu-grid">

                        {recommendedItems.map(item => (
                            <MenuCard
                                key={item._id}
                                item={item}
                                addToCart={addToCart}
                            />
                        ))}

                    </div>

                </div>

            )}
            <button
                className="next-btn"
                onClick={() => navigate("/cart")}
            >
                Next
            </button>

        </div>

    )

}

export default Menu;