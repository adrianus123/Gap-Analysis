import React from "react";
import Label from "./Label";
import Input from "../Input";

const InputLabel = (props) => {
  const {
    name,
    placeholder,
    classname,
    value,
    onChange,
    onBlur,
    type,
    label,
    error,
    errMessage,
  } = props;
  return (
    <div className="space-y-2">
      <Label name={name} title={label} />
      <Input
        name={name}
        type={type}
        classname={classname}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        error={error}
        errMessage={errMessage}
      />
    </div>
  );
};

export default InputLabel;
