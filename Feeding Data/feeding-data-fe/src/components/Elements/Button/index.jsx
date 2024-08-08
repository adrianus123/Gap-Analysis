import React from "react";

const Button = (props) => {
  const { children, classname, event, disabled } = props;

  return (
    <button
      onClick={event}
      className={`font-medium transition ease-in-out duration-200 ${classname}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
