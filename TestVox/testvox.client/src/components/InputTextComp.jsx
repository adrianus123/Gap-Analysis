import { Input, Typography } from "@material-tailwind/react";

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

export default InputTextComp;
