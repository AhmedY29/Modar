import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import LandingPage from "../pages/landingPage/LandingPage";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import "../i18next";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Home from "../pages/home/Home";

const Layout = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  let lng = Cookies.get("i18next") || "ar";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  return (
    <div className="font-rubik">
      <Navbar changeLanguage={changeLanguage} lng={lng} />
      <Outlet />
    </div>
  );
};

// TODO: When user Logged in can Visit This Home page

// const ProtectRoute = (children) => {
//     return children;
// }

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/auth",
        children: [
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
