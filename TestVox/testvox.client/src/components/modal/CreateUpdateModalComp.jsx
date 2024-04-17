import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import TextfieldComp from "./TextfieldComp";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateUpdateModalComp = ({ isUpdate, open, handleOpen, action }) => {
  const formik = useFormik({
    initialValues: {
      organizerName: "",
      imageLocation: "",
    },
    validationSchema: Yup.object({
      organizerName: Yup.string().required("Required"),
      imageLocation: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <div className="relative">
            <Typography variant="h4" color="blue-gray">
              {isUpdate ? "Update" : "Create"} Organizer
            </Typography>
            <IconButton
              className="!absolute right-[-20px] top-[-20px]"
              onClick={handleOpen}
              variant="text"
            >
              <IoIosCloseCircleOutline className="text-xl" />
            </IconButton>
          </div>
          <form id="form" onSubmit={formik.handleSubmit} className="space-y-4">
            <TextfieldComp
              id="organizerName"
              name="Organizer Name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.organizerName}
              isError={
                formik.touched.organizerName && formik.errors.organizerName
              }
              errorMessage={formik.errors.organizerName}
            />
            <TextfieldComp
              id="imageLocation"
              name="Image Location"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.imageLocation}
              isError={
                formik.touched.imageLocation && formik.errors.imageLocation
              }
              errorMessage={formik.errors.imageLocation}
            />
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            type="submit"
            variant="gradient"
            form="form"
            onClick={action}
            fullWidth
          >
            {isUpdate ? "Update" : "Create"}
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default CreateUpdateModalComp;
