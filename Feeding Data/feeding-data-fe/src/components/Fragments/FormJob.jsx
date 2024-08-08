import React from "react";
import TitleText from "../Elements/TitleText";
import InputLabel from "../Elements/InputLabel";
import SelectLabel from "../Elements/SelectLabel";
import Button from "../Elements/Button";

const FormJob = (props) => {
  const { title } = props;
  return (
    <div className="space-y-8">
      <TitleText classname="text-2xl text-center" text={title} />
      <form action="" className="grid grid-cols-2 gap-2">
        <InputLabel
          label="Title"
          name="title"
          placeholder="Job position"
          classname=""
          type="text"
        />
        <InputLabel
          label="Company"
          name="company"
          placeholder="Company name"
          classname=""
          type="text"
        />
        <InputLabel
          label="Location"
          name="location"
          placeholder="Location placement"
          classname=""
          type="text"
        />
        <InputLabel
          label="Salary"
          name="salary"
          placeholder="Rp5.000.000 - Rp7.000.000 per month"
          classname=""
          type="text"
        />
        <InputLabel
          label="Teaser"
          name="teaser"
          placeholder="Teaser for make interest"
          classname=""
          type="text"
        />
        <InputLabel
          label="Other Info"
          name="bullet_points"
          placeholder="BPJS; Free Lunch; etc"
          classname=""
          type="text"
        />
        <InputLabel
          label="Workplace"
          name="workplace"
          placeholder="Office; WFH; etc"
          classname=""
          type="text"
        />
        <SelectLabel
          label="Job Type"
          name="job_type"
          data={null}
          idKey=""
          nameKey=""
        />
        <SelectLabel
          label="Classification"
          name="classification"
          data={null}
          idKey=""
          nameKey=""
        />
        <SelectLabel
          label="Sub Classification"
          name="sub_classification"
          data={null}
          idKey=""
          nameKey=""
        />
        <input
          type="submit"
          className="p-2 bg-green-700 text-white rounded col-span-2"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default FormJob;
