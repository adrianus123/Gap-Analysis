import React from "react";

const Button = (props) => {
  const { children, classname, event, disabled } = props;

  return (
    <button
      onClick={event}
      className={`font-medium ${classname}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
