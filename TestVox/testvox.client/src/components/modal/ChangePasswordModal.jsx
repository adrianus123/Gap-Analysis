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
import PasswordInputComp from "./PasswordInputComp";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ChangePassword } from "../../apis";
import PropTypes from "prop-types";
import AlertComp from "../AlertComp";

const ChangePasswordModal = ({ open, handleOpen }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState({
    isError: false,
    message: "",
  });

  const handleOpenAlert = () => setOpenAlert(!openAlert);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(6, "Old password must be 6 characters long.")
        .required("Required"),
      newPassword: Yup.string()
        .matches(
          "(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9])",
          "Must contain uppercase, lowercase, and special characters"
        )
        .min(6, "New password must be 6 characters long.")
        .required("Required"),
      repeatPassword: Yup.string()
        .min(6, "Repeat password must be 6 characters long.")
        .required("Required"),
    }),
    onSubmit: (values) => {
      changePassword(values);
      handleOpen();
    },
  });

  const changePassword = async (data) => {
    const response = await ChangePassword(data);

    handleOpenAlert();
    if (response.status !== 200) {
      console.log(response);
      setAlert((values) => ({
        isError: true,
        message: response.data.result,
      }));

      return;
    }

    setAlert((values) => ({
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
                Change Password
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
              id="change_password_form"
              onSubmit={formik.handleSubmit}
              className="space-y-4"
            >
              <PasswordInputComp
                id="oldPassword"
                name="Old Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.oldPassword}
                isError={
                  formik.touched.oldPassword &&
                  formik.errors.oldPassword != null
                }
                errorMessage={formik.errors.oldPassword}
              />
              <PasswordInputComp
                id="newPassword"
                name="New Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                isError={
                  formik.touched.newPassword &&
                  formik.errors.newPassword != null
                }
                errorMessage={formik.errors.newPassword}
              />
              <PasswordInputComp
                id="repeatPassword"
                name="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.repeatPassword}
                isError={
                  formik.touched.repeatPassword &&
                  formik.errors.repeatPassword != null
                }
                errorMessage={formik.errors.repeatPassword}
              />
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              type="submit"
              form="change_password_form"
              variant="gradient"
              fullWidth
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      <AlertComp
        open={openAlert}
        handleOpen={handleOpenAlert}
        isError={alert.isError}
        message={alert.message}
      />
    </>
  );
};

ChangePasswordModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default ChangePasswordModal;
