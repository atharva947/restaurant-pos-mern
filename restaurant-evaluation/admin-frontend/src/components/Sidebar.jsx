import { Link } from "react-router-dom";
import { FaHome, FaUtensils, FaClipboardList, FaChartBar } from "react-icons/fa";

function Sidebar() {
    return (
        <div className="sidebar">

            <div className="logo">⭐</div>

            <div className="sidebar-menu">
                <Link to="/"><FaHome /></Link>
                <Link to="/tables"><FaUtensils /></Link>
                <Link to="/orders"><FaClipboardList /></Link>
                <Link to="/menu"><FaChartBar /></Link>
            </div>

        </div>
    );
}

export default Sidebar;