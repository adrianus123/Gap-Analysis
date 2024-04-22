import React, { useEffect, useState } from "react";
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
import { CreateOrganizer, GetOrganizer, UpdateOrganizer } from "../../apis";
import AlertComp from "../AlertComp";

const CreateUpdateModalComp = ({ id, isUpdate, open, handleOpen, action }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState({
    isError: "",
    message: "",
  });

  const [formValues, setFormValues] = useState({
    organizerName: "",
    imageLocation: "",
  });

  const handleOpenAlert = () => setOpenAlert(!openAlert);

  useEffect(() => {
    if (isUpdate) {
      GetOrganizer(id)
        .then((res) => {
          setFormValues({
            organizerName: res.organizerName,
            imageLocation: res.imageLocation,
          });
        })
        .catch((err) => console.error(err));
    }
  }, [isUpdate]);

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: Yup.object({
      organizerName: Yup.string().required("Required"),
      imageLocation: Yup.string()
        .required("Required")
        .url("Invalid url format"),
    }),
    onSubmit: (values) => {
      createUpdateOrganizer(id, values);
      handleOpen();
    },
  });

  const createUpdateOrganizer = async (id, data) => {
    const response = await (isUpdate
      ? UpdateOrganizer(id, data)
      : CreateOrganizer(data));

    handleOpenAlert();
    if (response.status !== 200) {
      setAlert((value) => ({
        isError: true,
        message: response.data,
      }));
      return;
    }

    console.log(response);
    setAlert((value) => ({
      isError: false,
      message: "Success",
    }));
  };

  return (
    <>
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
            <form
              id="form"
              onSubmit={formik.handleSubmit}
              className="space-y-4"
            >
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
                type="url"
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

      {/* <AlertComp
        open={openAlert}
        handleOpen={handleOpenAlert}
        isError={alert.isError}
        message={alert.message}
      /> */}
    </>
  );
};

export default CreateUpdateModalComp;
