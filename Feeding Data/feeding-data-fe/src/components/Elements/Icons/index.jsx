import React from "react";

const Icons = (props) => {
  const { icon, text } = props;
  return (
    <div className="flex gap-4 items-center">
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default Icons;
