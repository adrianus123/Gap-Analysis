import React from "react";
import Label from "../InputLabel/Label";
import Select from "../Select";

const SelectLabel = (props) => {
  const { name, label, data, idKey, nameKey } = props;
  return (
    <div className="space-y-2">
      <Label name={name} title={label} />
      <Select name={name} data={data} idKey={idKey} nameKey={nameKey} />
    </div>
  );
};

export default SelectLabel;
