import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { GoAlertFill } from "react-icons/go";

const ConfirmDeleteModal = ({ open, handleOpen, action, isAccount }) => {
  return (
    <Dialog open={open} handler={handleOpen} size="sm">
      <DialogHeader className="grid place-items-center">
        <Typography variant="h5" color="blue-gray">
          {`Delete ${isAccount ? "Account" : "Item"}!`}
        </Typography>
      </DialogHeader>
      <DialogBody divider className="grid place-items-center gap-4">
        <GoAlertFill size={100} color="red" />

        <Typography className="text-center font-normal">
          {`Are you sure you want to delete this ${
            isAccount ? "account" : "item"
          } ?`}
        </Typography>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="text" color="blue-gray" onClick={handleOpen}>
          Cancel
        </Button>
        <Button variant="filled" color="red" onClick={action}>
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
