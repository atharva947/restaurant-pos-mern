import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import Tables from "./pages/Tables";
import Orders from "./pages/Orders";
import Menu from "./pages/Menu";


function App() {

  return (
    <Layout>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>

    </Layout>

  );

}

export default App;