import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { getUsers, logout } from "../redux/authSlice";
import { changeTheme } from "../redux/themeSlice";

// React Icon
import { LuSunMedium } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";

function MobileTopNav(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  console.log(users, "users");
  console.log(user, "user");

  const handleChangeLan = (lng) => {
    props.changeLanguage(lng);
  };
  return (
    <nav className="nav-section sticky top-0 w-full flex lg:hidden justify-center bg-linear-to-b from-white/80 to-white/30 backdrop-blur-lg pb-2 z-10">
      <div className="nav-content flex items-center justify-between w-[95%]">
        <Link to={user ? "/home/ideas" : "/"}>
          <div className="logo">
            <img src={"/logo.png"} width={100} alt="s" />
          </div>
        </Link>
        <ul className=" lg:flex hidden gap-10 rounded-b-3xl justify-center items-center h-full w-[77%] text-2xl text-white bg-black/80 z-10 ">
          <a
            className="opacity-65 hover:opacity-100 transition-all duration-200"
            href="#home"
          >
            <li>{t("Home")}</li>
          </a>
          <a
            className="opacity-65 hover:opacity-100 transition-all duration-200"
            href="#about"
          >
            <li>{t("About")}</li>
          </a>
          <a
            className="opacity-65 hover:opacity-100 transition-all duration-200"
            href="#how"
          >
            <li>{t("How")}</li>
          </a>
          <a
            className="opacity-65 hover:opacity-100 transition-all duration-200"
            href="#contact"
          >
            <li>{t("Contact")}</li>
          </a>
        </ul>
        <div className="btn flex items-center gap-3 lg:w-[15%]">
          <button
            onClick={() => handleChangeLan(props.lng == "ar" ? "en" : "ar")}
            className="bg-black hover:bg-[#333] w-fit p-2 px-3 rounded-xl text-white cursor-pointer transition-all duration-200"
          >
            {props.lng == "ar" ? "En" : "Ar"}
          </button>
          <button
            onClick={() => dispatch(changeTheme())}
            className="bg-black hover:bg-[#333] w-10 h-10 p-2 px-3 rounded-xl text-white cursor-pointer transition-all duration-200"
          >
            {theme == "dark" ? <LuSunMedium /> : <FaRegMoon />}
          </button>
          {user ? (
            <div className="relative">
              <div>
                <h1 className="cursor-pointer line-clamp-1">
                  {t("Welcome")}, {user.username} 👋🏻
                </h1>
              </div>
              <div
                className={`${
                  open ? "flex" : "hidden"
                } flex-col items-center gap-3 w-full rounded-md overflow-hidden shadow absolute top-8 bg-amber-200`}
              >
                <ul className="w-full text-center">
                  <li
                    onClick={() => dispatch(changeTheme())}
                    className="flex justify-center bg-black text-white dark:bg-dark-bg hover:bg-[#333] w-full border-b cursor-pointer p-2 px-3 transition-all duration-200"
                  >
                    {theme == "dark" ? <LuSunMedium /> : <FaRegMoon />}
                  </li>
                  <li
                    className="bg-black text-white hover:bg-[#333] w-full border-b cursor-pointer p-2 px-3 transition-all duration-200"
                    onClick={() => {
                      dispatch(logout());
                      navigate("/");
                    }}
                  >
                    {t("Logout")}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => dispatch(changeTheme())}
                className="bg-black hover:bg-[#333] w-fit p-2 px-3 rounded-xl text-white cursor-pointer transition-all duration-200"
              >
                {theme == "dark" ? <LuSunMedium /> : <FaRegMoon />}
              </button>

              {user ? (
                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                  className="bg-black hover:bg-[#333] w-full p-2 px-3 rounded-xl text-white cursor-pointer transition-all duration-200"
                >
                  {t("Logout")}
                </button>
              ) : (
                <button
                  onClick={() => navigate("/auth/login")}
                  className="bg-black hover:bg-[#333] w-full p-2 px-3 rounded-xl text-white cursor-pointer transition-all duration-200"
                >
                  {t("Get Started")}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MobileTopNav;
