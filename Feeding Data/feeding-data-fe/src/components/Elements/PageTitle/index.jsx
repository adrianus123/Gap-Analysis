import React from "react";

const PageTitle = (props) => {
  const { title, children } = props;
  return (
    <div className="flex justify-between">
      <h1 className="font-semibold text-4xl text-slate-800">{title}</h1>
      {children}
    </div>
  );
};

export default PageTitle;
