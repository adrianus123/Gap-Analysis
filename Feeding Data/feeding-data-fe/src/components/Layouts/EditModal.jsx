import React, { useContext } from "react";
import Modal from "../Fragments/Modal";
import FormJob from "../Fragments/FormJob";
import Button from "../Elements/Button";
import { IoClose } from "react-icons/io5";
import { EditJob } from "../../scripts/apis";
import apiContext from "../../scripts/context";

const EditModal = (props) => {
  const { open, handleOpen, data } = props;
  const { handleRefresh, showAlert } = useContext(apiContext);

  const editJob = async (id, data) => {
    try {
      const res = await EditJob(id, data);
      console.log(res);

      showAlert("success", "Data updated successfully.");
      handleRefresh();
      handleOpen();
    } catch (error) {
      showAlert("danger", error);
      return error;
    }
  };

  return (
    <Modal open={open} handleOpen={handleOpen}>
      <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-500">
        <Button classname="absolute right-0 top-0 p-4" event={handleOpen}>
          <IoClose size={25} />
        </Button>
        <FormJob
          title="Update Job"
          action={editJob}
          data={data}
          isUpdate={true}
        />
      </div>
    </Modal>
  );
};

export default EditModal;
