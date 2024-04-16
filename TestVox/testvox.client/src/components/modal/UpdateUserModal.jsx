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
import DropdownButtonComp from "../DropdownButtonComp";
import { FaUserEdit } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import TextfieldComp from "./TextfieldComp";

const UpdateUserModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <DropdownButtonComp
        name="Update Profile"
        icon={<FaUserEdit />}
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
                Update Profile
              </Typography>
              <IconButton
                className="!absolute right-[-20px] top-[-20px]"
                onClick={handleOpen}
                variant="text"
              >
                <IoIosCloseCircleOutline className="text-xl" />
              </IconButton>
            </div>
            <TextfieldComp name="First Name" type="text" />
            <TextfieldComp name="Last Name" type="text" />
            <TextfieldComp name="Email" type="email" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Update
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default UpdateUserModal;
