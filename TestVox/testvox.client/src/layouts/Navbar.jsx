import { PiSignOut } from "react-icons/pi";
import { FaLock, FaUserEdit } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="flex items-center justify-around bg-[#242424] text-white">
            <h1 className="text-4xl uppercase font-medium">
                <a href="/home">Logo</a>
            </h1>
            <ul className="inline-flex space-x-8 relative">
                <li className="py-4 block cursor-pointer transition-all after:transition-all before:transition-all relative after:absolute
                    after:bottom-0 after:left-0 after:right-0 after:m-auto after:w-0 after:text-transparent
                    after:bg-[#fff] after:h-[2px] hover:after:w-full">
                    <a href="/home">Home</a>
                </li>
                <li className="py-4 block cursor-pointer transition-all after:transition-all before:transition-all relative after:absolute
                    after:bottom-0 after:left-0 after:right-0 after:m-auto after:w-0 after:text-transparent
                    after:bg-[#fff] after:h-[2px] hover:after:w-full group">
                    <a>Profile</a>

                    <ul className="absolute top-14 w-[150px] rounded shadow-md opacity-0 group-hover:opacity-100 transitiion-all duration-300 bg-[#f5f5f5]">
                        <li>
                            <a href="#" className="text-black text-xs p-2 hover:bg-white inline-flex items-center w-full">
                                <FaUserEdit />
                                <span className="ml-2">Update Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-black text-xs p-2 hover:bg-white inline-flex items-center w-full">
                                <FaLock />
                                <span className="ml-2">Change Password</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-black text-xs p-2 hover:bg-white inline-flex items-center w-full">
                                <PiSignOut />
                                <span className="ml-2">Sign Out</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;