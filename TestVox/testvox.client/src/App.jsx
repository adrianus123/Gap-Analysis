import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import SpinnerComp from "./components/SpinnerComp";

function App() {
  return (
    <div>
      <RouterProvider router={router} fallbackElement={<SpinnerComp />} />
    </div>
  );
}

export default App;
