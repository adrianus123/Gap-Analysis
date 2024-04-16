import React, { useState } from "react";
import { Button, ButtonGroup, IconButton } from "@material-tailwind/react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

function PaginationComp() {
  const [active, setActive] = useState(1);
  const [size, setSize] = useState(10);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  const handleSize = (value) => setSize(value);

  return (
    <div className="flex justify-between items-center p-4 rounded-md shadow-md bg-white">
      <div className="flex items-center gap-4">
        <span className="font-medium text-md">Entries</span>
        <ButtonGroup variant="text" size="sm">
          <Button onClick={() => handleSize(10)} className={size === 10 ? "bg-black text-white hover:text-black" : ""}>10</Button>
          <Button onClick={() => handleSize(20)} className={size === 20 ? "bg-black text-white hover:text-black" : ""}>20</Button>
          <Button onClick={() => handleSize(50)} className={size === 50 ? "bg-black text-white hover:text-black" : ""}>50</Button>
        </ButtonGroup>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={active === 1}
        >
          <IoIosArrowRoundBack strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-2">
          <IconButton {...getItemProps(1)}>1</IconButton>
          <IconButton {...getItemProps(2)}>2</IconButton>
          <IconButton {...getItemProps(3)}>3</IconButton>
          <IconButton {...getItemProps(4)}>4</IconButton>
          <IconButton {...getItemProps(5)}>5</IconButton>
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={next}
          disabled={active === 5}
        >
          Next
          <IoIosArrowRoundForward strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default PaginationComp;
