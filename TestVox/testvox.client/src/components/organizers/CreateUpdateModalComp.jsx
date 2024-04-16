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
import { IoIosCloseCircleOutline } from "react-icons/io";
import TextfieldComp from "../modal/TextfieldComp";

const CreateUpdateModalComp = ({ isUpdate, open, handleOpen, action }) => {
  return (
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
              {isUpdate ? "Update" : "Create"} Organizer
            </Typography>
            <IconButton
              className="!absolute right-[-20px] top-[-20px]"
              onClick={handleOpen}
              variant="text"
            >
              <IoIosCloseCircleOutline className="text-xl" />
            </IconButton>
          </div>
          <TextfieldComp name="Organizer Name" type="text" />
          <TextfieldComp name="Image Location" type="text" />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={action} fullWidth>
            {isUpdate ? "Update" : "Create"}
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default CreateUpdateModalComp;
