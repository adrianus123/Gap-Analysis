import React from "react";

const Modal = (props) => {
  const { open, handleOpen, children } = props;

  return (
    <>
      {open ? (
        <div className="fixed inset-0 flex items-center justify-center z-40 overflow-auto">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleOpen}
          ></div>
          {children}
        </div>
      ) : null}
    </>
  );
};

export default Modal;
