import { useNavigate } from "react-router-dom";
import { getImage } from "../utils/getImage";

function Cart({ cart, setCart }) {

    const navigate = useNavigate();

    const increase = (index) => {

        const updated = [...cart];
        updated[index].qty += 1;

        setCart(updated);

    };

    const decrease = (index) => {

        const updated = [...cart];

        if (updated[index].qty > 1) {
            updated[index].qty -= 1;
        }

        setCart(updated);

    };

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

    return (

        <div>

            <h2>Your Order</h2>

            {cart.map((item, index) => (

                <div key={index} className="cart-item">

                    <img
                        src={getImage(item.category)}
                        className="cart-image"
                        alt={item.name}
                    />

                    <div>

                        <h3>{item.name}</h3>

                        <p>₹ {item.price}</p>

                        <div className="qty">

                            <button onClick={() => decrease(index)}>-</button>

                            <span>{item.qty}</span>

                            <button onClick={() => increase(index)}>+</button>

                        </div>

                    </div>

                </div>

            ))}

            <h3>Total ₹ {total}</h3>

            <button
                className="next-btn"
                onClick={() => navigate("/checkout")}
            >
                Next
            </button>

        </div>

    );

}

export default Cart;