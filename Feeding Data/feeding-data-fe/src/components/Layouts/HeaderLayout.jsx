import React, { useContext, useState } from "react";
import PageTitle from "../Elements/PageTitle";
import Button from "../Elements/Button";
import FilterForm from "../Fragments/FilterForm";
import AddModal from "./AddModal";
import GenerateModal from "./GenerateModal";
import apiContext from "../../scripts/context";
import { DownloadExcel } from "../../scripts/apis";

const HeaderLayout = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openGenerateModal, setOpenGenerateModal] = useState(false);

  const { filter } = useContext(apiContext);

  const handleOpenAddModal = () => setOpenAddModal(!openAddModal);
  const handleOpenGenerateModal = () =>
    setOpenGenerateModal(!openGenerateModal);

  const download = async () => {
    try {
      const response = await DownloadExcel(
        filter.keyword,
        filter.type,
        filter.location,
        filter.tag
      );

      const url = window.URL.createObjectURL(new Blob([response]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "Jobs.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      console.log(res);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div className="space-y-8 p-8 bg-gradient-to-r from-cyan-500 to-blue-500 sticky top-0 z-10">
        <PageTitle title="Dashboard">
          <div className="flex items-center gap-x-4">
            <Button
              event={handleOpenGenerateModal}
              classname="bg-rose-500 hover:bg-rose-700 rounded py-2 px-3 text-white"
            >
              Generate Data
            </Button>
            <Button
              classname="bg-lime-500 hover:bg-lime-700 rounded py-2 px-3 text-white"
              event={handleOpenAddModal}
            >
              Add Job
            </Button>
            <Button
              classname="bg-green-500 hover:bg-green-700 rounded py-2 px-3 text-white"
              event={download}
            >
              Export Excel
            </Button>
          </div>
        </PageTitle>
        <FilterForm />
      </div>
      <AddModal open={openAddModal} handleOpen={handleOpenAddModal} />
      <GenerateModal
        open={openGenerateModal}
        handleOpen={handleOpenGenerateModal}
      />
    </>
  );
};

export default HeaderLayout;
