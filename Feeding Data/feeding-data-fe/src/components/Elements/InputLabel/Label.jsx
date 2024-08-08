import React from "react";

const Label = (props) => {
  const { title, name } = props;
  return <label htmlFor={name} className="font-medium">{title}</label>;
};

export default Label;
