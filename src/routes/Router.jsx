import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router";
import LandingPage from "../pages/landingPage/LandingPage";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import "../i18next";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import LoginAdmin from "../pages/auth/login/LoginAdmin";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SideBar from "../components/SideBar";
import Ideas from "../pages/home/components/Ideas";

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

const HomeLayout = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  let lng = Cookies.get("i18next") || "ar";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  return (
    <ProtectRoute>
      <div className="font-rubik flex w-full">
        <SideBar changeLanguage={changeLanguage} lng={lng} />
        <Outlet />
      </div>
    </ProtectRoute>
  );
};

// TODO: When user Logged in can Visit This Home page

const ProtectRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    toast.error("You have to Login");
    return <Navigate to={"/"} />;
  }
  return children;
};

const ProtectAdminPages = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  if (user.role !== "admin") {
    toast.error("You Don't have Authorize");
    return <Navigate to={"/"} />;
  }
  return children;
};

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
        path: "/admin_dashboard_modar_2977",
        element: (
          <ProtectAdminPages>
            <AdminDashboard />
          </ProtectAdminPages>
        ),
      },
      {
        path: "/auth",
        children: [
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/login_admin_modar_2977",
            element: <LoginAdmin />,
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
        ],
      },
    ],
  },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [{ path: "/home/ideas", element: <Ideas /> }],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
