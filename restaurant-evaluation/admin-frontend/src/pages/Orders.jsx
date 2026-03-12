import { useEffect, useState } from "react";
import { getOrders, getChefs, assignChef } from "../services/api";
import { completeOrder } from "../services/api";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [chefs, setChefs] = useState([]);

    useEffect(() => {
        fetchOrders();
        fetchChefs();
    }, []);

    const fetchOrders = async () => {
        const data = await getOrders();
        setOrders(data);
    };

    const fetchChefs = async () => {
        const data = await getChefs();
        setChefs(data);
    };

    const handleAssign = async (orderId, chefId) => {
        await assignChef(orderId, chefId);
        fetchOrders();
    };
    const handleComplete = async (orderId) => {

        await completeOrder(orderId);

        fetchOrders(); // reload orders after completion

    };

    return (
        <div className="page-container">

            <h1>Order Line</h1>

            <div className="orders-grid">

                {orders.map(order => {

                    let cardClass = "order-card";

                    if (order.status === "PREPARING") {
                        cardClass += " processing";
                    }

                    if (order.status === "SERVED") {
                        cardClass += " done";
                    }

                    if (order.orderType === "TAKEAWAY") {
                        cardClass += " takeaway";
                    }

                    return (

                        <div className={cardClass} key={order._id}>

                           
                            <div className="order-header-panel">
                                <div className="order-header-top">

                                    <div className="order-header-left">
                                        <span className="order-icon">🍴</span>
                                        <span className="order-id">#{order.orderId.slice(-3)}</span>
                                    </div>

                                    {order.status === "SERVED" ? (

                                        <span className="badge served">
                                            Done
                                            <br />
                                            Served
                                        </span>

                                    ) : order.orderType === "TAKEAWAY" ? (

                                        <span className="badge takeaway">
                                            Take Away
                                            <br />
                                            Not Picked Up
                                        </span>

                                    ) : (

                                        <span className="badge dine">
                                            Dine In
                                            <br />
                                            Ongoing: {order.processingTimeRemaining || 0} Min
                                        </span>

                                    )}

                                </div>

                                <div className="order-details">
                                    <div>Table-{String(order.table?.tableNumber).padStart(2, "0")}</div>
                                    <div className="order-time">
                                        {new Date(order.createdAt).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true
                                        })}
                                    </div>

                                    <div>{order.items?.length} Item</div>
                                </div>

                            </div>


                            <div className="order-items-box">

                                {order.items?.map(item => (

                                    <div className="order-item-row" key={item._id}>

                                        <span className="qty">{item.quantity}x</span>

                                        <div className="item-name">
                                            {item.menuItem?.name}
                                        </div>

                                    </div>

                                ))}

                            </div>


                            <div className="order-action">

                                {order.status === "SERVED" ? (

                                    <button className="done-btn">
                                        Order Done ✔
                                    </button>

                                ) : (

                                    <button
                                        className="processing-btn"
                                        onClick={() => handleComplete(order._id)}
                                    >
                                        Complete Order
                                    </button>

                                )}

                            </div>

                        </div>

                    );
                })}

            </div>

        </div>
    );
}

export default Orders;