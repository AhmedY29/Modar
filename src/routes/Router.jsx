import {
  createBrowserRouter,
  Link,
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
import Teams from "../pages/adminDashboard/components/Teams";
import Teachers from "../pages/adminDashboard/components/Teachers";
import Students from "../pages/adminDashboard/components/Students";
import Profile from "../pages/profile/Profile";
import TeamMember from "../pages/home/components/TeamMember";
import MobileNav from "../components/MobileNav";
import MobileTopNav from "../components/MobileTopNav";

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
      <MobileTopNav changeLanguage={changeLanguage} lng={lng} />
      <div className="font-rubik flex w-full">
        <SideBar changeLanguage={changeLanguage} lng={lng} />
        <Outlet />
      </div>
      <MobileNav />
    </ProtectRoute>
  );
};
const AdminLayout = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  let lng = Cookies.get("i18next") || "ar";
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lng]);
  return (
    <ProtectAdminPages>
      <MobileTopNav changeLanguage={changeLanguage} lng={lng} />
      <div className="font-rubik flex w-full">
        <SideBar changeLanguage={changeLanguage} lng={lng} />
        <Outlet />
      </div>
      <MobileNav />
    </ProtectAdminPages>
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

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <h1>Page Not Found!</h1>
      <p>We Will Redirect You to home</p>
      <Link to={"/"}>
        <button className="bg-black hover:bg-[#333] w-fit p-2 px-3 rounded-xl text-white cursor-pointer transition-all duration-200">
          Click Hero
        </button>
      </Link>
    </div>
  );
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
    path: "/admin_dashboard_modar_2977",
    element: <AdminLayout />,
    children: [
      { path: "/admin_dashboard_modar_2977/info", element: <AdminDashboard /> },
      { path: "/admin_dashboard_modar_2977/teams", element: <Teams /> },
      { path: "/admin_dashboard_modar_2977/teachers", element: <Teachers /> },
      { path: "/admin_dashboard_modar_2977/students", element: <Students /> },
      { path: "/admin_dashboard_modar_2977/profile", element: <Profile /> },
    ],
  },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [
      { path: "/home/ideas", element: <Ideas /> },
      { path: "/home/profile", element: <Profile /> },
      { path: "/home/team-member", element: <TeamMember /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
