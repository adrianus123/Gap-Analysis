import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  IconButton,
} from "@material-tailwind/react";
import { FaLock } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io"; 
import PasswordInputComp from "./PasswordInputComp";
import DropdownButtonComp from "../DropdownButtonComp";

const ChangePasswordModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <DropdownButtonComp
        name="Change Password"
        icon={<FaLock />}
        action={handleOpen}
      />
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <div className="relative">
              <Typography variant="h4" color="blue-gray">
                Change Password
              </Typography>
              <IconButton
                className="!absolute right-[-20px] top-[-20px]"
                onClick={handleOpen}
                variant="text"
              >
                <IoIosCloseCircleOutline className="text-xl" />
              </IconButton>
            </div>
            <PasswordInputComp name="Old Password" />
            <PasswordInputComp name="New Password" />
            <PasswordInputComp name="Confirm Password" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Save
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default ChangePasswordModal;
