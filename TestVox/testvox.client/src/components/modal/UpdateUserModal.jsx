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
import DropdownButtonComp from "../DropdownButtonComp";
import { FaUserEdit } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import TextfieldComp from "./TextfieldComp";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GetUser, UpdateProfile } from "../../apis";

const UpdateUserModal = ({open, handleOpen}) => {
  // const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);

  // const handleOpen = () => setOpen((cur) => !cur);

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
    <>
      {/* <DropdownButtonComp
        name="Update Profile"
        icon={<FaUserEdit />}
        action={handleOpen}
      /> */}
      {user != [] ? (
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
                  isError={formik.touched.firstName && formik.errors.firstName}
                  errorMessage={formik.errors.firstName}
                />
                <TextfieldComp
                  id="lastName"
                  name="Last Name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  isError={formik.touched.lastName && formik.errors.lastName}
                  errorMessage={formik.errors.lastName}
                />
                <TextfieldComp
                  id="email"
                  name="Email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isError={formik.touched.email && formik.errors.email}
                  errorMessage={formik.errors.email}
                />
              </form>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                form="form_update"
                variant="gradient"
                fullWidth
              >
                Update
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      ) : null}
    </>
  );
};

export default UpdateUserModal;
