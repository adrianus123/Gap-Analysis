import React, { useContext } from "react";
import Modal from "../Fragments/Modal";
import FormJob from "../Fragments/FormJob";
import Button from "../Elements/Button";
import { IoClose } from "react-icons/io5";
import apiContext from "../../scripts/context";
import { AddJob } from "../../scripts/apis";

const AddModal = (props) => {
  const { open, handleOpen } = props;
  const { handleRefresh, showAlert } = useContext(apiContext);

  const addJob = async (data) => {
    try {
      const res = await AddJob(data);

      if (res.status != 201) {
        throw new Error("Failed add job");
      }
      showAlert("success", res.data.message);
      handleRefresh();
      handleOpen();
    } catch (error) {
      showAlert("danger", error.message || "An error occurred");
      return error;
    }
  };

  return (
    <Modal open={open} handleOpen={handleOpen}>
      <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-500">
        <Button classname="absolute right-0 top-0 p-4" event={handleOpen}>
          <IoClose size={25} />
        </Button>
        <FormJob title="Create Job" action={addJob} isUpdate={false} />
      </div>
    </Modal>
  );
};

export default AddModal;
