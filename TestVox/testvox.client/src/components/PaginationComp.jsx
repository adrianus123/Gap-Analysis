import React from "react";
import { Button, ButtonGroup, IconButton } from "@material-tailwind/react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

function PaginationComp({ active, setActive, size, setSize, totalPages }) {
  const pagesToShow = [1];
  for (let i = active - 2; i <= active + 2; i++) {
    if (i > 1 && i < totalPages) {
      pagesToShow.push(i);
    }
  }
  pagesToShow.push(totalPages);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === totalPages) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  const handleSize = (value) => setSize(value);

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between items-center p-4 rounded-md shadow-md bg-white">
      <div className="flex items-center gap-4">
        <span className="font-medium text-md">Entries</span>
        <ButtonGroup variant="text" size="sm">
          <Button
            onClick={() => handleSize(10)}
            className={
              size === 10 ? "bg-black text-white hover:text-black" : ""
            }
          >
            10
          </Button>
          <Button
            onClick={() => handleSize(20)}
            className={
              size === 20 ? "bg-black text-white hover:text-black" : ""
            }
          >
            20
          </Button>
          <Button
            onClick={() => handleSize(50)}
            className={
              size === 50 ? "bg-black text-white hover:text-black" : ""
            }
          >
            50
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={active === 1}
        >
          <IoIosArrowRoundBack strokeWidth={2} className="h-4 w-4" /> 
          <span className="hidden md:block">Previous</span>
        </Button>
        <div className="flex items-center gap-2">
          {pagesToShow.map((page) => (
            <IconButton key={page} {...getItemProps(page)}>
              {page}
            </IconButton>
          ))}
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={next}
          disabled={active === totalPages}
        >
          <span className="hidden md:block">Next</span>
          <IoIosArrowRoundForward strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default PaginationComp;
