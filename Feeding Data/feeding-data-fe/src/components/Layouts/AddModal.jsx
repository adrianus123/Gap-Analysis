import React from "react";
import Modal from "../Fragments/Modal";
import FormJob from "../Fragments/FormJob";
import Button from "../Elements/Button";
import { IoClose } from "react-icons/io5";

const AddModal = (props) => {
  const { open, handleOpen } = props;

  return (
    <Modal open={open} handleOpen={handleOpen}>
      <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-500">
        <Button classname="absolute right-0 top-0 p-4" event={handleOpen}>
          <IoClose size={25} />
        </Button>
        <FormJob title="Create Job" />
      </div>
    </Modal>
  );
};

export default AddModal;
