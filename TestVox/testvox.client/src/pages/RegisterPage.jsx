import InputTextComp from "../components/InputTextComp";
import InputPasswordComp from "../components/InputPasswordComp";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

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
        .min(6, "Password must be 6 characters long")
        .required("Required"),
      repeatPassword: Yup.string()
        .min(6, "Confirm password must be 6 characters long")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      navigate("/sign-in");
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen py-4">
      <div className="lg:p-12 border-2 space-y-8 rounded-xl lg:backdrop-blur-sm">
        <div className="space-y-2">
          <h1 className="text-4xl text-white text-center">Create Account</h1>
          <h5 className="text-white text-sm text-center">
            Enter your details to register
          </h5>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <InputTextComp
              id="firstName"
              type="text"
              name="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              isError={formik.touched.firstName && formik.errors.firstName}
              errorMessage={formik.errors.firstName}
            />
            <InputTextComp
              id="lastName"
              type="text"
              name="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              isError={formik.touched.lastName && formik.errors.lastName}
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
            isError={formik.touched.email && formik.errors.email}
            errorMessage={formik.errors.email}
          />
          <InputPasswordComp
            id="password"
            name="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            isError={formik.touched.password && formik.errors.password}
            errorMessage={formik.errors.password}
          />
          <InputPasswordComp
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
    </div>
  );
}

export default RegisterPage;
