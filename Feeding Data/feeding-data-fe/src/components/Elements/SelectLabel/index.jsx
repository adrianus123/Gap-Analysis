import React from "react";
import Label from "../InputLabel/Label";
import Select from "../Select";

const SelectLabel = (props) => {
  const {
    name,
    label,
    data,
    idKey,
    nameKey,
    value,
    onChange,
    onBlur,
    error,
    errMessage,
  } = props;
  return (
    <div className="space-y-2">
      <Label name={name} title={label} />
      <Select
        name={name}
        data={data}
        idKey={idKey}
        nameKey={nameKey}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        errMessage={errMessage}
      />
    </div>
  );
};

export default SelectLabel;
