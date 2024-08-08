import React from "react";
import Modal from "../Fragments/Modal";
import Button from "../Elements/Button";
import TitleText from "../Elements/TitleText";

const DeleteModal = (props) => {
  const { open, handleOpen } = props;
  return (
    <Modal open={open} handleOpen={handleOpen}>
      <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-500 space-y-8">
        <TitleText text="Alert" classname="text-2xl text-center uppercase" />
        <div className="space-y-4">
          <div className="text-lg">Are you sure want to delete this item?</div>
          <div className="flex gap-4 items-center justify-center">
            <Button classname="text-white px-4 py-2 bg-red-700 rounded">
              Delete
            </Button>
            <Button
              classname="px-4 py-2 border border-red-700 rounded"
              event={handleOpen}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
