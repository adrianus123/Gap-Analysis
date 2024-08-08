import React from "react";

const TitleText = (props) => {
  const { text, classname } = props;
  return <div className={`font-medium ${classname}`}>{text}</div>;
};

export default TitleText;
