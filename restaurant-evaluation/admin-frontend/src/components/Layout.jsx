import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {

    return (
        <div className="layout">

            <Sidebar />

            <div className="main-section">
                <Header />
                <main className="main-content">
                    {children}
                </main>
            </div>

        </div>
    );
}

export default Layout;