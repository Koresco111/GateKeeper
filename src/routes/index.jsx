import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Home from "../pages/users/Home";
import Records from "../pages/records/Records";
import Create from "../pages/records/Create";
import Error from "../components/Notification/Error";
import Success from "../components/Notification/Success";
import Admin from "../pages/Admin/Admin";

function MainRoute() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/auth/signup",
      element: <Signup />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/records",
      element: <Records />,
    },
    {
      path: "/create",
      element: <Create />,
    },
    {
      path: "/success",
      element: <Success />,
    },
    {
      path: "/error",
      element: <Error />,
    },
    {
      path: "/home/record/admin",
      element: <Admin />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default MainRoute;
