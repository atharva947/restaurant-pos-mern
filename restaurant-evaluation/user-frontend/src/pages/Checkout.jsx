import { useState } from "react";
import { getImage } from "../utils/getImage";

function Checkout({ cart }) {

    const [showInstructions, setShowInstructions] = useState(false)
    const [instructions, setInstructions] = useState("")

    const [orderType, setOrderType] = useState("dinein")

    const itemTotal = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    )

    const delivery = orderType === "takeaway" ? 50 : 0
    const tax = itemTotal * 0.05

    const grandTotal = itemTotal + delivery + tax

    if (cart.length === 0) {
        return <h2>Your cart is empty</h2>
    }

    const placeOrder = async () => {

        const formattedItems = cart.map(item => ({
            menuItemId: item._id,
            quantity: item.qty
        }));

        const orderData = {

            orderType: orderType === "takeaway" ? "TAKEAWAY" : "DINE_IN",

            clientData: {
                name: "Guest",
                phone: "9999999999"
            },

            items: formattedItems
        };
        console.log(orderData)
        try {

            const res = await fetch("http://localhost:4000/api/orders", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(orderData)

            });
            const data = await res.json();

            if (res.ok) {
                alert("Order placed successfully");
            } else {
                alert(data.message);
            }
        } catch (err) {

            console.log(err);

        }

    };

    const [dragX, setDragX] = useState(0)
    const [isDragging, setIsDragging] = useState(false)


    return (

        <div>

            <h2>Order Summary</h2>

            {cart.map((item, index) => (

                <div key={index} className="checkout-item">

                    <img
                        src={getImage(item.category)}
                        className="checkout-image"
                        alt={item.name}
                    />

                    <div>

                        <h4>{item.name}</h4>

                        <p>{item.qty} x ₹{item.price}</p>

                    </div>

                </div>

            ))}

            <hr />

            <p>Item Total ₹ {itemTotal.toFixed(2)}</p>
            <p>Delivery ₹ {delivery}</p>
            <p>Tax ₹ {tax.toFixed(2)}</p>

            <h3>Grand Total ₹ {grandTotal.toFixed(2)}</h3>

            <div className="order-type">

                <button
                    onClick={() => setOrderType("dinein")}
                    className={orderType === "dinein" ? "active" : ""}
                >
                    Dine In
                </button>

                <button
                    onClick={() => setOrderType("takeaway")}
                    className={orderType === "takeaway" ? "active" : ""}
                >
                    Take Away
                </button>

            </div>
            <button
                onClick={() => setShowInstructions(true)}
                className="instruction-btn"
            >
                Add Cooking Instructions
            </button>


            <div className="swipe-container">

                <div
                    className="swipe-button"
                    style={{ transform: `translateX(${dragX}px)` }}

                    onMouseDown={() => setIsDragging(true)}

                    onMouseMove={(e) => {
                        if (!isDragging) return
                        const x = Math.min(e.movementX + dragX, 220)
                        setDragX(x)

                        if (x > 200) {
                            placeOrder()
                        }
                    }}

                    onMouseUp={() => {
                        setIsDragging(false)
                        setDragX(0)
                    }}

                >
                    →
                </div>

                <p>Swipe to Order</p>

            </div>
            {showInstructions && (

                <div className="modal-overlay">

                    <div className="modal">

                        <h3>Add Cooking Instructions</h3>

                        <textarea
                            placeholder="Enter instructions"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                        />

                        <div className="modal-buttons">

                            <button
                                onClick={() => setShowInstructions(false)}
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => setShowInstructions(false)}
                            >
                                Save
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    )

}

export default Checkout