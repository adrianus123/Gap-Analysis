import Dashboard from "../layouts/Dashboard";
import Navbar from "../layouts/Navbar";

function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 bg-gray-200 p-4">
                <Dashboard />
            </div>
        </div>
    );
}

export default HomePage;