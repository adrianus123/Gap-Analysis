import { Input, Typography } from "@material-tailwind/react";
import React from "react";

const TextfieldComp = ({
  name,
  type,
  error,
  isError,
  errorMessage,
  ...props
}) => {
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

export default TextfieldComp;
