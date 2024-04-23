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
import { GetUser, UpdateProfile } from "../../apis";
import PropTypes from "prop-types";

const UpdateUserModal = ({ open, handleOpen }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    GetUser()
      .then((res) => {
        console.log(res);
        setUser(res);
      })
      .catch((err) => console.error(err));
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      updateProfile(values);
      handleOpen();
    },
  });

  const updateProfile = async (data) => {
    const response = await UpdateProfile(data);
    console.log(response);
  };

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
              Update Profile
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
            id="form_update"
            onSubmit={formik.handleSubmit}
            className="space-y-4"
          >
            <TextfieldComp
              id="firstName"
              name="First Name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              isError={
                formik.touched.firstName && formik.errors.firstName != null
              }
              errorMessage={formik.errors.firstName}
            />
            <TextfieldComp
              id="lastName"
              name="Last Name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              isError={
                formik.touched.lastName && formik.errors.lastName != null
              }
              errorMessage={formik.errors.lastName}
            />
            <TextfieldComp
              id="email"
              name="Email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isError={formik.touched.email && formik.errors.email != null}
              errorMessage={formik.errors.email}
            />
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" form="form_update" variant="gradient" fullWidth>
            Update
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

UpdateUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default UpdateUserModal;
