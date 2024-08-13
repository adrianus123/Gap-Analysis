import React from "react";
import { GiMagnifyingGlass } from "react-icons/gi";
import TitleText from "../Elements/TitleText";

const ResultNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <GiMagnifyingGlass size={200} />
      <TitleText text="No results found" classname="text-3xl" />
    </div>
  );
};

export default ResultNotFound;
