import React from "react";

const Input = (props) => {
  const {
    type,
    placeholder,
    name,
    onChange,
    onBlur,
    value,
    error,
    errMessage,
  } = props;

  return (
    <>
      <input
        id={name}
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`border rounded w-full p-4 placeholder:opacity-50 outline outline-0 text-slate-700 ${
          error ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm">{errMessage}</p>}
    </>
  );
};

export default Input;
