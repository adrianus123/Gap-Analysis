import React from "react";
import { Typography } from "@material-tailwind/react";
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  return (
    <Typography as="div" className="grid place-items-center min-h-screen">
      <Typography as="div" className="m-4 flex flex-col items-center">
        <TbError404 className="h-32 md:h-48 text-gray-900 w-32 md:w-48 flex block" />
        <Typography variant="h2">
          Page Not Found
        </Typography>
      </Typography>
    </Typography>
  );
};

export default NotFound;
