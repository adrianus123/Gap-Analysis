import React from "react";
import { Input, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

const TextfieldComp = ({ name, type, isError, errorMessage, ...props }) => {
  return (
    <div className="flex flex-col gap-4">
      <Typography className="-mb-2" variant="h6">
        {name}
      </Typography>
      <div>
        <Input label={name} type={type} {...props} error={isError} />
        {isError ? (
          <Typography variant="small" color="red" className="mt-1">
            {errorMessage}
          </Typography>
        ) : null}
      </div>
    </div>
  );
};

TextfieldComp.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default TextfieldComp;
