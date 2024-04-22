import { NavbarWithMegaMenu } from "../layouts/NavbarWithMegaMenu";
import Dashboard from "../layouts/Dashboard";

function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavbarWithMegaMenu />
            <div className="flex-1 bg-gray-200 p-4">
                <Dashboard />
            </div>
        </div>
    );
}

export default HomePage;