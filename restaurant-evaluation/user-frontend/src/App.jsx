import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {

  const [cart, setCart] = useState([]);

  return (

    <BrowserRouter>

      <div className="customer-container">

        <Routes>

          <Route path="/" element={<Menu cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />

        </Routes>

      </div>

    </BrowserRouter>

  )

}

export default App