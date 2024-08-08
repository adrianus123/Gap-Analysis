import React, { useState } from "react";
import PageTitle from "../Elements/PageTitle";
import Button from "../Elements/Button";
import FilterForm from "../Fragments/FilterForm";
import AddModal from "./AddModal";

const HeaderLayout = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div className="space-y-8 p-8 bg-gradient-to-r from-cyan-500 to-blue-500 sticky top-0 z-10">
        <PageTitle title="Dashboard">
          <div className="flex items-center gap-x-4">
            <Button classname="bg-rose-500 hover:bg-rose-700 rounded py-2 px-3 text-white">
              Generate Data
            </Button>
            <Button
              classname="bg-lime-500 hover:bg-lime-700 rounded py-2 px-3 text-white"
              event={handleOpen}
            >
              Add Job
            </Button>
            <Button classname="bg-green-500 hover:bg-green-700 rounded py-2 px-3 text-white">
              Export Excel
            </Button>
          </div>
        </PageTitle>
        <FilterForm />
      </div>
      <AddModal open={openModal} handleOpen={handleOpen} />
    </>
  );
};

export default HeaderLayout;
