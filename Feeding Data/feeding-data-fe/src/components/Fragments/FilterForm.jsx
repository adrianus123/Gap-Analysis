import React, { useContext, useEffect, useState } from "react";
import Select from "../Elements/Select";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import { GetJobType, GetLocation, GetTags } from "../../scripts/apis";
import apiContext from "../../scripts/context";
import { useFormik } from "formik";

const FilterForm = () => {
  const [locations, setLocations] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [tags, setTags] = useState([]);

  const { isRefresh, handleFilter, handleRefresh, setCurrentPage } =
    useContext(apiContext);

  useEffect(() => {
    if (isRefresh) {
      getLocation();
      getJobType();
      getTag();
    }
  }, [isRefresh]);

  const getLocation = async () => {
    try {
      const res = await GetLocation();

      if (res.status != 200) {
        throw new Error(res.response.data.message);
      }

      setLocations(res.data.data);
    } catch (error) {
      console.log(error.message || "An error occurred");
    }
  };

  const getJobType = async () => {
    try {
      const res = await GetJobType();

      if (res.status != 200) {
        throw new Error(res.response.data.message);
      }

      setJobTypes(res.data.data);
    } catch (error) {
      console.log(error.message || "An error occurred");
    }
  };

  const getTag = async () => {
    try {
      const res = await GetTags();

      if (res.status != 200) {
        throw new Error(res.response.data.message);
      }

      setTags(res.data.data);
    } catch (error) {
      console.log(error.message || "An error occurred");
    }
  };

  const formik = useFormik({
    initialValues: {
      tag: "",
      keyword: "",
      location: "",
      type: "",
    },
    onSubmit: (values) => {
      search(values);
    },
  });

  const search = (values) => {
    setCurrentPage(1);
    handleFilter(values);
    handleRefresh();
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex justify-around gap-x-4"
    >
      <Select
        name="tag"
        data={tags}
        idKey="slug"
        nameKey="tag_name"
        value={formik.values.tag}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Input
        type="text"
        name="keyword"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.keyword}
        placeholder="Insert keyword..."
      />
      <Select
        name="location"
        data={locations}
        idKey="location"
        nameKey="location"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.location}
      />
      <Select
        name="type"
        data={jobTypes}
        idKey="job_type"
        nameKey="job_type"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.type}
      />
      <Button
        type="submit"
        classname="bg-amber-500 hover:bg-amber-700 py-2 px-3 text-white rounded"
      >
        Search
      </Button>
    </form>
  );
};

export default FilterForm;
