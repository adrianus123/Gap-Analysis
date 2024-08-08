import React from "react";
import Button from "../Elements/Button";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = (props) => {
  const {
    jobsPerPage,
    handlePage,
    totalData,
    paginateFront,
    paginateBack,
    currentPage,
    paginate,
    endIndex,
  } = props;

  const totalPages = Math.ceil(totalData / jobsPerPage);
  const pageNumbers = [];

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage === 1) {
    pageNumbers.push(currentPage);
    pageNumbers.push(currentPage + 1);
    pageNumbers.push(currentPage + 2);
  } else if (currentPage === totalPages) {
    pageNumbers.push(currentPage - 2);
    pageNumbers.push(currentPage - 1);
    pageNumbers.push(currentPage);
  } else {
    pageNumbers.push(currentPage - 1);
    pageNumbers.push(currentPage);
    pageNumbers.push(currentPage + 1);
  }

  const active =
    "transition ease-in-out duration-200 bg-blue-500 text-white hover:bg-blue-700 relative inline-flex items-center px-4 py-2 border text-sm rounded-full";
  const inactive =
    "transition ease-in-out duration-200 bg-white border-blue-500 text-gray-500 hover:bg-blue-700 hover:text-white relative inline-flex items-center px-4 py-2 border text-sm rounded-full";

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <span className="font-medium text-slate-700">Entries</span>
        <div className="flex gap-1 items-center">
          <Button
            classname={jobsPerPage === 10 ? active : inactive}
            event={() => handlePage(10)}
          >
            10
          </Button>
          <Button
            classname={jobsPerPage === 20 ? active : inactive}
            event={() => handlePage(20)}
          >
            20
          </Button>
          <Button
            classname={jobsPerPage === 50 ? active : inactive}
            event={() => handlePage(50)}
          >
            50
          </Button>
        </div>
      </div>
      <div className="py-2 flex justify-end gap-2">
        <Button
          classname="relative inline-flex items-center px-4 py-2 rounded-l-md transition ease-in-out duration-200 bg-blue-500 text-white text-sm text-gray-500 hover:bg-blue-700 disabled:opacity-70"
          event={() => {
            paginateBack();
          }}
          disabled={currentPage === 1}
        >
          <MdKeyboardArrowLeft />
          Prev
        </Button>
        <nav className="block">
          <ul className="flex list-none flex-wrap gap-2">
            {pageNumbers.map((number, i) => (
              <li key={i}>
                <Button
                  classname={currentPage === number ? active : inactive}
                  event={() => {
                    paginate(number);
                  }}
                >
                  {number}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          classname="relative inline-flex items-center px-4 py-2 rounded-r-md transition ease-in-out duration-200 bg-blue-500 text-white text-sm text-gray-500 hover:bg-blue-700 disabled:opacity-70"
          event={() => {
            paginateFront();
          }}
          disabled={endIndex >= totalData}
        >
          Next
          <MdKeyboardArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
