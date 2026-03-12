import { getImage } from "../utils/getImage";

function MenuCard({ item, addToCart }) {

    return (

        <div className="menu-card">

            <img
                src={getImage(item.category)}
                alt={item.name}
                className="menu-image"
            />

            <div className="menu-info">

                <h4>{item.name}</h4>

                <p>₹ {item.price}</p>

                <button
                    className="add-btn"
                    onClick={() => addToCart(item)}
                >
                    +
                </button>

            </div>

        </div>

    )

}

export default MenuCard;