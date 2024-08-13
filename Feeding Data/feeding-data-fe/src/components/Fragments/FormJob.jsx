import React, { useEffect, useState } from "react";
import TitleText from "../Elements/TitleText";
import InputLabel from "../Elements/InputLabel";
import SelectLabel from "../Elements/SelectLabel";
import Button from "../Elements/Button";
import { useFormik } from "formik";
import {
  GetClassification,
  GetJobType,
  GetSubClassification,
  GetTags,
} from "../../scripts/apis";
import * as Yup from "yup";

const FormJob = (props) => {
  const { title, action, data, isUpdate } = props;

  const [jobTypes, setJobTypes] = useState([]);
  const [tags, setTags] = useState([]);
  const [classification, setClassification] = useState([]);
  const [subClassification, setSubClassification] = useState([]);

  useEffect(() => {
    getJobTypes();
    getTags();
    getClassification();
    getSubClassification();
  }, []);

  const getJobTypes = async () => {
    try {
      const response = await GetJobType();
      setJobTypes(response.data);
    } catch (error) {
      return error;
    }
  };

  const getTags = async () => {
    try {
      const response = await GetTags();
      setTags(response.data);
    } catch (error) {
      return error;
    }
  };

  const getClassification = async () => {
    try {
      const response = await GetClassification();
      setClassification(response.data);
    } catch (error) {
      return error;
    }
  };

  const getSubClassification = async () => {
    try {
      const response = await GetSubClassification();
      setSubClassification(response.data);
    } catch (error) {
      return error;
    }
  };

  const formik = useFormik({
    initialValues: {
      title: data?.title || "",
      company: data?.company || "",
      location: data?.location || "",
      salary: data?.salary || "",
      teaser: data?.teaser || "",
      bullet_points: data?.bullet_points || "",
      workplace: data?.workplace || "",
      job_type: data?.job_type || "",
      classification: data?.classification || "",
      sub_classification: data?.sub_classification || "",
      tag: data?.keyword || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      company: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      workplace: Yup.string().required("Required"),
      job_type: Yup.string().required("Required"),
      classification: Yup.string().required("Required"),
      sub_classification: Yup.string().required("Required"),
      tag: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      isUpdate ? action(data?.job_id, values) : action(values);
    },
  });

  return (
    <div className="space-y-8">
      <TitleText classname="text-2xl text-center" text={title} />
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-2 gap-2 overflow-auto"
      >
        <SelectLabel
          label="Tag"
          name="tag"
          data={tags}
          idKey="slug"
          nameKey="tag_name"
          value={formik.values.tag}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.tag && formik.errors.tag != null}
          errMessage={formik.errors.tag}
        />
        <InputLabel
          label="Job Position"
          name="title"
          placeholder="Job position"
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && formik.errors.title != null}
          errMessage={formik.errors.title}
        />
        <InputLabel
          label="Company"
          name="company"
          placeholder="Company name"
          type="text"
          value={formik.values.company}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.company && formik.errors.company != null}
          errMessage={formik.errors.company}
        />
        <InputLabel
          label="Location"
          name="location"
          placeholder="Location placement"
          type="text"
          value={formik.values.location}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.location && formik.errors.location != null}
          errMessage={formik.errors.location}
        />
        <InputLabel
          label="Salary"
          name="salary"
          placeholder="Rp5.000.000 - Rp7.000.000 per month"
          type="text"
          value={formik.values.salary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.salary && formik.errors.salary != null}
          errMessage={formik.errors.salary}
        />
        <InputLabel
          label="Teaser"
          name="teaser"
          placeholder="Teaser for make interest"
          type="text"
          value={formik.values.teaser}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.teaser && formik.errors.teaser != null}
          errMessage={formik.errors.teaser}
        />
        <InputLabel
          label="Other Info"
          name="bullet_points"
          placeholder="BPJS; Free Lunch; etc"
          type="text"
          value={formik.values.bullet_points}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.bullet_points && formik.errors.bullet_points != null
          }
          errMessage={formik.errors.bullet_points}
        />
        <InputLabel
          label="Workplace"
          name="workplace"
          placeholder="Office; WFH; etc"
          type="text"
          value={formik.values.workplace}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.workplace && formik.errors.workplace != null}
          errMessage={formik.errors.workplace}
        />
        <SelectLabel
          label="Classification"
          name="classification"
          data={classification}
          idKey="classification"
          nameKey="classification"
          value={formik.values.classification}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.classification &&
            formik.errors.classification != null
          }
          errMessage={formik.errors.classification}
        />
        <SelectLabel
          label="Sub Classification"
          name="sub_classification"
          data={subClassification}
          idKey="sub_classification"
          nameKey="sub_classification"
          value={formik.values.sub_classification}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.sub_classification &&
            formik.errors.sub_classification != null
          }
          errMessage={formik.errors.sub_classification}
        />
        <SelectLabel
          label="Job Type"
          name="job_type"
          data={jobTypes}
          idKey="job_type"
          nameKey="job_type"
          value={formik.values.job_type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.job_type && formik.errors.job_type != null}
          errMessage={formik.errors.job_type}
        />
        <Button
          type="submit"
          classname="p-2 bg-green-500 hover:bg-green-700 text-white rounded col-span-2"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormJob;
