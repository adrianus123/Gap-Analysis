import { Spinner } from "@material-tailwind/react";
import React from "react";

const SpinnerComp = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Spinner className="h-16 w-16 text-gray-900/50" />
    </div>
  );
};

export default SpinnerComp;
