import { Input, Typography } from "@material-tailwind/react";
import React from "react";

const TextfieldComp = ({name, type}) => {
  return (
    <div className="flex flex-col gap-4">
      <Typography className="-mb-2" variant="h6">
        {name}
      </Typography>
      <Input label={name} type={type} />
    </div>
  );
};

export default TextfieldComp;
