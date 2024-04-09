import { MdOutlineAddCircleOutline } from "react-icons/md";
import PaginationComp from "../components/PaginationComp";
import CardComp from "../components/CardComp";

function Dashboard() {
    return (
        <div className="space-y-4 bg-white p-4 rounded-md shadow-md">
            {/*<div className="flex justify-between items-center">*/}
            {/*    <div>*/}
            {/*        <p className="text-sm text-gray-700">*/}
            {/*            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}*/}
            {/*            <span className="font-medium">97</span> results*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*    <button className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">*/}
            {/*        <MdOutlineAddCircleOutline />*/}
            {/*        <span className="ml-1">Add</span>*/}
            {/*    </button>*/}
            {/*</div>*/}
            <div className="grid grid-cols-4 gap-4">
                <CardComp />
            </div>
        </div>
    );
}

export default Dashboard;