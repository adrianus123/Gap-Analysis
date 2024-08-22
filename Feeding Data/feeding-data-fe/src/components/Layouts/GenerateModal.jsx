import React, { useContext, useEffect, useState } from "react";
import Modal from "../Fragments/Modal";
import Select from "../Elements/Select";
import apiContext from "../../scripts/context";
import Button from "../Elements/Button";
import { GenerateData, GetTags } from "../../scripts/apis";
import { useFormik } from "formik";
import * as Yup from "yup";

const GenerateModal = (props) => {
  const { open, handleOpen } = props;
  const { handleRefresh, showAlert } = useContext(apiContext);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
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
    },
    validationSchema: Yup.object({
      tag: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      generateData(values.tag);
    },
  });

  const generateData = async (tag) => {
    try {
      const res = await GenerateData(tag);

      if (res.status != 200) {
        throw new Error(res.response.data.message);
      }
      showAlert("success", res.data.message);
      handleRefresh();
      handleOpen();
    } catch (error) {
      showAlert("danger", error.message || "An error occurred");
      return error;
    }
  };

  return (
    <Modal open={open} handleOpen={handleOpen}>
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 w-96 gap-4 bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-500"
      >
        <Select
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
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            classname="grow bg-green-500 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Generate Data
          </Button>
          <Button
            event={handleOpen}
            classname="grow border border-green-500 hover:bg-green-700 hover:text-white px-4 py-2 rounded"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GenerateModal;
