export const getImage = (category) => {

    if (category === "Pizza")
        return "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop";

    if (category === "Burger")
        return "https://images.unsplash.com/photo-1550547660-d9450f859349";

    if (category === "Pasta")
        return "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9";

    if (category === "Sides")
        return "https://images.unsplash.com/photo-1573080496219-bb080dd4f877";

    if (category === "Beverage")
        return "https://images.unsplash.com/photo-1642647391072-6a2416f048e5?w=900&auto=format&fit=crop&q=60";

    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";
};