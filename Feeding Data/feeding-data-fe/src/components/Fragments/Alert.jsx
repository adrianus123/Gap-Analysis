import React, { useContext } from "react";
import TitleText from "../Elements/TitleText";
import Button from "../Elements/Button";
import { IoClose } from "react-icons/io5";
import apiContext from "../../scripts/context";

const AlertType = [
  { type: "success", bgColor: "bg-green-700" },
  { type: "warning", bgColor: "bg-yellow-700" },
  { type: "danger", bgColor: "bg-red-700" },
];

const Alert = () => {
  const { alert, hideAlert } = useContext(apiContext);

  const alertType = AlertType.find((item) => item.type === alert.type);
  const bgColor = alertType ? alertType.bgColor : "";

  return (
    <>
      {alert.open ? (
        <div
          className={`fixed top-10 left-1/4 right-1/4 shadow-md p-4 z-50 rounded-md ${bgColor} transition`}
        >
          <div className="flex items-center justify-between">
            <TitleText text={alert.text} classname="text-white" />
            <Button event={hideAlert}>
              <IoClose size={25} color="white" />
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Alert;
