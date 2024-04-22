import { Alert } from "@material-tailwind/react";
import React from "react";

const AlertComp = ({ open, handleOpen, message, isError }) => {
  return (
    <Alert
      open={open}
      onClose={handleOpen}
      color={isError ? "red" : "green"}
      className="absolute top-2 w-fit"
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
    >
      {message}
    </Alert>
  );
};

export default AlertComp;
