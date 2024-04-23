import { Alert } from "@material-tailwind/react";
import React from "react";
import PropTypes from 'prop-types';

const AlertComp = ({ open, handleOpen, message, isError }) => {
  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <Alert
        open={open}
        onClose={handleOpen}
        color={isError ? "red" : "green"}
        className="text-sm"
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        {message}
      </Alert>
    </div>
  );
};

AlertComp.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired
}

export default AlertComp;
