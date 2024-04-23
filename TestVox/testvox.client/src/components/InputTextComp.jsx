import { Input, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

function InputTextComp({ id, type, name, isError, errorMessage, ...props }) {
  return (
    <div className="flex flex-col items-start">
      <Input
        label={name}
        id={id}
        name={id}
        type={type}
        color="white"
        error={isError}
        {...props}
      />
      {isError ? (
        <Typography variant="small" color="red" className="mt-1">
          {errorMessage}
        </Typography>
      ) : null}
    </div>
  );
}

InputTextComp.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default InputTextComp;
