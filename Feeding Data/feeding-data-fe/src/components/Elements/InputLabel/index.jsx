import React from "react";
import Label from "./Label";
import Input from "../Input";

const InputLabel = (props) => {
  const { name, placeholder, classname, type, label } = props;
  return (
    <div className="space-y-2">
      <Label name={name} title={label} />
      <Input
        name={name}
        type={type}
        classname={classname}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputLabel;
