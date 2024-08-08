import React from "react";

const Select = (props) => {
  const { name, data, idKey, nameKey } = props;
  return (
    <select
      name={name}
      className="w-full border rounded p-4 outline outline-0 text-slate-700 appearance-none"
    >
      <option value="">{`Select ${name} ...`}</option>
      {data?.map((dt, index) => (
        <option key={index} value={dt[idKey]}>
          {dt[nameKey]}
        </option>
      ))}
    </select>
  );
};

export default Select;
