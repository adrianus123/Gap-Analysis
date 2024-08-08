import React from "react";

const Input = (props) => {
  const { type, placeholder, name } = props;
  return (
    <input
      type={type}
      name={name}
      className="border rounded w-full p-4 placeholder:opacity-50 outline outline-0 text-slate-700"
      placeholder={placeholder}
    />
  );
};

export default Input;
