import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const DetailModalComp = ({ open, handleOpen, name, imageUrl }) => {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader className="relative grid place-items-center">
        <Typography variant="h3" className="text-center">
          {name}
        </Typography>
        <IconButton
          className="!absolute right-1 top-1"
          onClick={handleOpen}
          variant="text"
        >
          <IoIosCloseCircleOutline className="text-2xl" />
        </IconButton>
      </DialogHeader>
      <DialogBody>
        <img src={imageUrl} alt={name} className="w-full rounded" />
      </DialogBody>
    </Dialog>
  );
};

export default DetailModalComp;
