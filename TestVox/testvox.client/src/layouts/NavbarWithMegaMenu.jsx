import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { IoIosArrowDown, IoIosMenu } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";
import { TiUserDelete } from "react-icons/ti";
import { PiSignOut } from "react-icons/pi";
import { FaLock, FaUserEdit, FaUserCircle } from "react-icons/fa";
import ChangePasswordModal from "../components/modal/ChangePasswordModal";
import UpdateUserModal from "../components/modal/UpdateUserModal";
import { useNavigate } from "react-router-dom";
import { DeleteAccount, GetUser, SignOut } from "../apis";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";

function NavListMenu() {
  const [user, setUser] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openChange, setOpenChange] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const navigate = useNavigate();

  const handleUpdate = () => setOpenUpdate(!openUpdate);
  const handleChange = () => setOpenChange(!openChange);
  const handleOpenDelete = () => setOpenConfirmDelete(!openConfirmDelete);
  const handleDelete = async () => {
    await DeleteAccount();
    handleSignOut();
  };
  const handleSignOut = () => {
    SignOut();
    navigate("/sign-in");
  };

  useEffect(() => {
    GetUser()
      .then((res) => setUser(res))
      .catch((err) => console.error(err));
  }, []);

  const renderItems = (
    <>
      <Typography as="div" className="m-2 rounded-md bg-gray-200 p-2 flex items-center gap-2">
        <FaUserCircle className="h-12 w-12" />
        <Typography as="div">
        <Typography variant="lead">
          {user?.firstName || ""} {user?.lastName || ""}
        </Typography>
        <Typography variant="small">{user?.email || ""}</Typography>
        </Typography>
      </Typography>
      <MenuItem onClick={handleUpdate}>
        <div className="flex items-center gap-2">
          <FaUserEdit strokeWidth={2} className="h-4 text-gray-900 w-4" />
          <Typography className="text-sm" color="blue-gray">
            Update Profile
          </Typography>
        </div>
      </MenuItem>
      <MenuItem onClick={handleChange}>
        <div className="flex items-center gap-2">
          <FaLock strokeWidth={2} className="h-4 text-gray-900 w-4" />
          <Typography className="text-sm" color="blue-gray">
            Change Password
          </Typography>
        </div>
      </MenuItem>
      <MenuItem onClick={handleOpenDelete}>
        <div className="flex items-center gap-2">
          <TiUserDelete strokeWidth={2} className="h-4 text-gray-900 w-4" />
          <Typography className="text-sm" color="blue-gray">
            Delete Account
          </Typography>
        </div>
      </MenuItem>
      <MenuItem onClick={handleSignOut}>
        <div className="flex items-center gap-2">
          <PiSignOut strokeWidth={2} className="h-4 text-gray-900 w-4" />
          <Typography className="text-sm" color="blue-gray">
            Sign Out
          </Typography>
        </div>
      </MenuItem>

      <UpdateUserModal open={openUpdate} handleOpen={handleUpdate} />
      <ChangePasswordModal open={openChange} handleOpen={handleChange} />
      <ConfirmDeleteModal
        open={openConfirmDelete}
        handleOpen={handleOpenDelete}
        action={handleDelete}
        isAccount={true}
      />
    </>
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Profiles
              <IoIosArrowDown
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <IoIosArrowDown
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-1 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="/home"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
      </Typography>
      <NavListMenu />
    </List>
  );
}

export function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="px-4 py-2 rounded-none sticky top-0 z-10">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/home"
          variant="h4"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2"
        >
          Logo
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <HiXMark className="h-6 w-6" strokeWidth={2} />
          ) : (
            <IoIosMenu className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
