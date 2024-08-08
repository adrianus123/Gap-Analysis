import React from "react";
import Select from "../Elements/Select";
import Input from "../Elements/Input";
import Button from "../Elements/Button";

const data = [
  { key: "Hello", value: "World" },
  { key: "Hello", value: "World" },
  { key: "Hello", value: "World" },
  { key: "Hello", value: "World" },
];

const FilterForm = () => {
  return (
    <div className="flex justify-around gap-x-4">
      <Select name="tag" data={data} idKey="key" nameKey="value" />
      <Input type="text" name="search" placeholder="Insert keyword..." />
      <Select name="location" data={data} idKey="key" nameKey="value" />
      <Select name="type" data={data} idKey="key" nameKey="value" />
      <Button classname="bg-amber-500 py-2 px-3 text-white rounded">
        Search
      </Button>
    </div>
  );
};

export default FilterForm;
