const API_BASE = "http://localhost:4000/api";

export const getDashboardStats = async () => {
    const res = await fetch(`${API_BASE}/analytics/dashboard`);
    return res.json();
};

export const getTables = async () => {
    const res = await fetch(`${API_BASE}/tables`);
    return res.json();
};

export const getOrders = async () => {
    const res = await fetch(`${API_BASE}/orders`);
    return res.json();
};

export const completeOrder = async (orderId) => {

    const res = await fetch(`${API_BASE}/orders/${orderId}/complete`, {
        method: "PATCH"
    });

    return res.json();

};

export const getMenuItems = async () => {
    const res = await fetch(`${API_BASE}/menu`);
    return res.json();
};

export const getOrderSummary = async (period) => {

    const res = await fetch(
        `http://localhost:4000/api/analytics/order-summary?period=${period}`
    );

    return res.json();
};

export const getRevenueData = async (period) => {

    const res = await fetch(
        `http://localhost:4000/api/analytics/revenue?period=${period}`
    );

    return res.json();
};
export const getChefs = async () => {
    const res = await fetch("http://localhost:4000/api/chefs");
    return res.json();
};

export const assignChef = async (orderId, chefId) => {
    await fetch(`http://localhost:4000/api/orders/${orderId}/assign`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ chefId })
    });
};

export const createMenuItem = async (data) => {

    const res = await fetch(`${API_BASE}/menu`, {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    });

    return res.json();

};

export const deleteMenuItem = async (id) => {

    const res = await fetch(`${API_BASE}/menu/${id}`, {
        method: "DELETE"
    });

    return res.json();

};
export const updateMenuItem = async (id, data) => {

    const res = await fetch(`${API_BASE}/menu/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();

};
