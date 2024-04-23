import { IconButton, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import PropTypes from "prop-types";

function InputTextComp({ id, name, isError, errorMessage, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-col items-start">
      <div className="relative w-full">
        <Input
          label={name}
          color="white"
          id={id}
          name={id}
          className="pr-8"
          type={isOpen ? "text" : "password"}
          error={isError}
          {...props}
        />
        {isError ? (
          <Typography variant="small" color="red" className="mt-1">
            {errorMessage}
          </Typography>
        ) : null}
        {isOpen ? (
          <IconButton
            onClick={handleOpen}
            className="!absolute right-1 top-1 text-white"
            variant="text"
            size="sm"
          >
            <FaRegEyeSlash />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleOpen}
            className="!absolute right-1 top-1 text-white"
            variant="text"
            size="sm"
          >
            <FaRegEye />
          </IconButton>
        )}
      </div>
    </div>
  );
}

InputTextComp.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default InputTextComp;
