import { IconButton, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PropTypes from 'prop-types';

const PasswordInputComp = ({ name, isError, errorMessage, ...props }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="flex flex-col gap-4">
      <Typography className="-mb-2" variant="h6">
        {name}
      </Typography>
      <div>
        <div className="relative flex w-full">
          <Input
            type={open ? "text" : "password"}
            label={name}
            className="pr-8"
            containerProps={{
              className: "min-w-0",
            }}
            error={isError}
            {...props}
          />
          {!open ? (
            <IconButton
              onClick={handleOpen}
              size="sm"
              className="!absolute right-1 top-1 rounded"
              variant="text"
            >
              <FaRegEye />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleOpen}
              size="sm"
              className="!absolute right-1 top-1 rounded"
              variant="text"
            >
              <FaRegEyeSlash />
            </IconButton>
          )}
        </div>
        {isError ? (
          <Typography variant="small" color="red" className="mt-1">
            {errorMessage}
          </Typography>
        ) : null}
      </div>
    </div>
  );
};

PasswordInputComp.propTypes = {
  name: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string
}

export default PasswordInputComp;
