import { PiSignOut } from "react-icons/pi";
import UpdateUserModal from "../components/modal/UpdateUserModal";
import ChangePasswordModal from "../components/modal/ChangePasswordModal";
import { TiUserDelete } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import DropdownButtonComp from "../components/DropdownButtonComp";
import { DeleteAccount, SignOut } from "../apis";

function Navigation() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    SignOut();
    navigate("/sign-in");
  };

  const deleteAccount = async () => {
    const response = await DeleteAccount();
    console.log(response);

    handleSignOut();
  };

  return (
    <nav className="flex items-center justify-around bg-[#242424] text-white sticky top-0 z-10">
      <h1 className="text-2xl md:text-4xl uppercase font-medium">
        <a href="/home">Logo</a>
      </h1>
      <ul className="inline-flex space-x-8 relative">
        <li
          className="py-4 block cursor-pointer transition-all after:transition-all before:transition-all relative after:absolute
                    after:bottom-0 after:left-0 after:right-0 after:m-auto after:w-0 after:text-transparent
                    after:bg-[#fff] after:h-[3px] hover:after:w-full"
        >
          <a href="/home">Home</a>
        </li>
        <li
          className="py-4 block cursor-pointer transition-all after:transition-all before:transition-all relative after:absolute
                    after:bottom-0 after:left-0 after:right-0 after:m-auto after:w-0 after:text-transparent
                    after:bg-[#fff] after:h-[3px] hover:after:w-full group overflow-hidden"
        >
          <a>Profile</a>
          <ul className="absolute top-14 w-[170px] rounded shadow-md opacity-0 group-hover:opacity-100 transitiion-all duration-300 bg-[#f5f5f5]">
            <li>
              <UpdateUserModal />
            </li>
            <li>
              <ChangePasswordModal />
            </li>
            <li>
              <DropdownButtonComp
                name="Delete Account"
                icon={<TiUserDelete />}
                action={() => deleteAccount()}
              />
            </li>
            <li>
              <DropdownButtonComp
                name="Sign Out"
                icon={<PiSignOut />}
                action={handleSignOut}
              />
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
