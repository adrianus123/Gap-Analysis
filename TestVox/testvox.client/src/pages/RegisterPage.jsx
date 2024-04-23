import InputTextComp from "../components/InputTextComp";
import InputPasswordComp from "../components/InputPasswordComp";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../apis";
import AlertComp from "../components/AlertComp";
import { useState } from "react";

function RegisterPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    isError: false,
    message: "",
  });

  const handleOpen = () => setOpen(!open);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .matches(
          "(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9])",
          "Must contain uppercase, lowercase, and special characters"
        )
        .min(6, "Password must be 6 characters long")
        .required("Required"),
      repeatPassword: Yup.string()
        .min(6, "Confirm password must be 6 characters long")
        .required("Required"),
    }),
    onSubmit: (values) => {
      register(values);
    },
  });

  const register = async (data) => {
    try {
      const response = await SignUp(data);
      if (response.status !== 200) {
        handleOpen();
        setAlert((value) => ({
          ...value,
          isError: true,
          message: response.data,
        }));
        return;
      }

      handleOpen();
      setAlert((value) => ({
        ...value,
        isError: false,
        message: "Create account successfully. Please log in.",
      }));

      navigate("/sign-in");
    } catch (error) {
      handleOpen();
      setAlert((value) => ({
        ...value,
        isError: true,
        message: "Internal server error",
      }));
    }
  };

  return (
    <div className="authentication flex items-center justify-center min-h-screen">
      <div className="p-8 md:p-12 border-2 space-y-8 rounded-none md:rounded-xl backdrop-blur-sm w-screen md:w-fit h-screen md:h-fit">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl text-white text-center">
            Create Account
          </h1>
          <h5 className="text-white text-sm text-center">
            Enter your details to register
          </h5>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <InputTextComp
              id="firstName"
              type="text"
              name="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              isError={
                formik.touched.firstName && formik.errors.firstName != null
              }
              errorMessage={formik.errors.firstName}
            />
            <InputTextComp
              id="lastName"
              type="text"
              name="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              isError={
                formik.touched.lastName && formik.errors.lastName != null
              }
              errorMessage={formik.errors.lastName}
            />
          </div>
          <InputTextComp
            id="email"
            type="email"
            name="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            isError={formik.touched.email && formik.errors.email != null}
            errorMessage={formik.errors.email}
          />
          <InputPasswordComp
            id="password"
            name="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isError={formik.touched.password && formik.errors.password != null}
            errorMessage={formik.errors.password}
          />
          <InputPasswordComp
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
          <div>
            <input
              type="submit"
              value="Sign Up"
              className="button text-white rounded w-full py-2 tracking-widest"
            />
          </div>
        </form>

        <div className="text-white text-center">
          Have an account ?{" "}
          <a
            href="sign-in"
            className="cursor-pointer text-white hover:underline"
          >
            Sign In
          </a>
        </div>
      </div>
      <AlertComp
        open={open}
        handleOpen={handleOpen}
        message={alert.message}
        isError={alert.isError}
      />
    </div>
  );
}

export default RegisterPage;
