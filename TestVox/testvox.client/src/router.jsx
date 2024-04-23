import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Authorization from "./layouts/Authorization";
import NotFound from "./layouts/NotFound";

const router = createBrowserRouter([
  {
    path: "sign-in",
    element: <LoginPage />,
  },
  {
    path: "sign-up",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: (
      <Authorization>
        <HomePage />
      </Authorization>
    ),
    children: [
      {
        path: "home",
        element: (
          <Authorization>
            <HomePage />
          </Authorization>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/">
//       <Route
//         index
//         element={
//           <Authorization>
//             <HomePage />
//           </Authorization>
//         }
//       />
//       <Route path="sign-in" element={<LoginPage />} />
//       <Route path="sign-up" element={<RegisterPage />} />
//       <Route
//         path="home"
//         element={
//           <Authorization>
//             <HomePage />
//           </Authorization>
//         }
//       />
//       <Route path="*" element={<NotFound />} />
//     </Route>
//   )
// );

export default router;
