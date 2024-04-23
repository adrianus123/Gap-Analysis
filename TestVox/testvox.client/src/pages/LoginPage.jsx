import InputTextComp from "../components/InputTextComp";
import InputPasswordComp from "../components/InputPasswordComp";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SignIn } from "../apis";
import AlertComp from "../components/AlertComp";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    isError: false,
    message: "",
  });

  const handleOpen = () => setOpen(!open);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be 6 characters long")
        .required("Required"),
    }),
    onSubmit: (values) => {
      login(values);
    },
  });

  const login = async (data) => {
    try {
      const response = await SignIn(data);
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
        message: "Login successfully",
      }));

      navigate("/home");
    } catch (e) {
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
      <div className="p-8 md:p-12 border-2 space-y-8 rounded-none md:rounded-xl backdrop-blur-sm w-screen md:w-[400px] h-screen md:h-fit">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl text-white text-center">
            Welcome Back
          </h1>
          <h5 className="text-white text-sm text-center">
            Please login to access your account
          </h5>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
          <div>
            <input
              type="submit"
              value="Sign In"
              className="button text-white rounded w-full py-2 tracking-widest"
            />
          </div>
        </form>

        <div className="text-white text-center">
          Don&apos;t have an account ?{" "}
          <a
            href="sign-up"
            className="cursor-pointer text-white hover:underline"
          >
            Sign Up
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
export default LoginPage;
