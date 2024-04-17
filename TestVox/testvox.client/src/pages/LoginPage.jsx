import InputTextComp from "../components/InputTextComp";
import InputPasswordComp from "../components/InputPasswordComp";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function LoginPage() {
  const navigate = useNavigate();

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
      alert(JSON.stringify(values, null, 2));
      navigate("/home");
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="lg:p-12 border-2 space-y-8 rounded-xl lg:backdrop-blur-sm lg:w-[400px]">
        <div className="space-y-2">
          <h1 className="text-4xl text-white text-center">Welcome Back</h1>
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
    </div>
  );
}
export default LoginPage;
