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
import { FaLock } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PasswordInputComp from "./PasswordInputComp";
import DropdownButtonComp from "../DropdownButtonComp";
import * as Yup from "yup";
import { useFormik } from "formik";

const ChangePasswordModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

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
        .min(6, "New password must be 6 characters long.")
        .required("Required"),
      repeatPassword: Yup.string()
        .min(6, "Repeat password must be 6 characters long.")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <DropdownButtonComp
        name="Change Password"
        icon={<FaLock />}
        action={handleOpen}
      />
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
                  formik.touched.oldPassword && formik.errors.oldPassword
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
                  formik.touched.newPassword && formik.errors.newPassword
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
                  formik.touched.repeatPassword && formik.errors.repeatPassword
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
    </>
  );
};

export default ChangePasswordModal;
