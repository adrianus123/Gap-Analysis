import React from "react";

const Select = (props) => {
  const {
    name,
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
    <>
      <select
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        className={`w-full border rounded p-4 outline outline-0 text-slate-700 appearance-none ${
          error ? "border-red-500" : ""
        }`}
      >
        <option value="">{`Select ${name} ...`}</option>
        {data?.map((dt, index) => (
          <option key={index} value={dt[idKey]}>
            {dt[nameKey]}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{errMessage}</p>}
    </>
  );
};

export default Select;
