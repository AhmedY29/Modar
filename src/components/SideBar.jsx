import React from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../redux/themeSlice";
import { useTranslation } from "react-i18next";

// React Icon
import { LuSunMedium } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";
import { logout } from "../redux/authSlice";

function SideBar(props) {
  const { t } = useTranslation();

  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth.user);
  console.log(theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeLan = (lng) => {
    props.changeLanguage(lng);
  };

  return (
    <aside
      className={`hidden lg:block h-screen sticky top-0 ${
        props.lng == "ar" ? "rounded-l-4xl" : "rounded-r-4xl"
      } pt-3 bg-amber-300 dark:bg-amber-300 w-[12rem] ${
        theme == "dark" ? "dark" : ""
      }`}
    >
      <Link to={"/home"}>
        <div className="logo flex justify-center">
          <img src={"/logo.png"} width={100} alt="s" />
        </div>
      </Link>
      <h1 className="flex justify-center absolute mt-10 mx-3 text-white">
        {t("Welcome")}, {user.username} 👋🏻
      </h1>
      <div className="btns flex flex-col gap-4 justify-center h-full w-full">
        {user?.role == "admin" ? (
          <>
            <button
              onClick={() => navigate("info")}
              className={`${
                window.top.location.pathname.includes("info")
                  ? props.lng == "ar"
                    ? "rounded-l-xl bg-black"
                    : "rounded-r-xl bg-black"
                  : "bg-black/60"
              }  hover:bg-[#333] p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
                theme == "dark" ? "dark" : ""
              }`}
            >
              {t("General")}
            </button>
            <button
              onClick={() => navigate("ideas")}
              className={` ${
                window.top.location.pathname.includes("ideas")
                  ? props.lng == "ar"
                    ? "rounded-l-xl bg-black"
                    : "rounded-r-xl bg-black"
                  : "bg-black/60"
              } hover:bg-[#333] p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
                theme == "dark" ? "dark" : ""
              }`}
            >
              {t("Ideas")}
            </button>
            <button
              onClick={() => navigate("teachers")}
              className={`${
                window.top.location.pathname.includes("teachers")
                  ? props.lng == "ar"
                    ? "rounded-l-xl bg-black"
                    : "rounded-r-xl bg-black"
                  : "bg-black/60"
              } hover:bg-[#333] p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
                theme == "dark" ? "dark" : ""
              }`}
            >
              {t("Teachers")}
            </button>
            <button
              onClick={() => navigate("students")}
              className={`${
                window.top.location.pathname.includes("students")
                  ? props.lng == "ar"
                    ? "rounded-l-xl bg-black"
                    : "rounded-r-xl bg-black"
                  : "bg-black/60"
              } hover:bg-[#333] p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
                theme == "dark" ? "dark" : ""
              }`}
            >
              {t("Students")}
            </button>
            <button
              onClick={() => navigate("teams")}
              className={`${
                window.top.location.pathname.includes("teams")
                  ? props.lng == "ar"
                    ? "rounded-l-xl bg-black"
                    : "rounded-r-xl bg-black"
                  : "bg-black/60"
              } hover:bg-[#333] p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
                theme == "dark" ? "dark" : ""
              }`}
            >
              {t("Teams")}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("ideas")}
              className={`${
                window.top.location.pathname.includes("ideas")
                  ? props.lng == "ar"
                    ? "rounded-l-xl bg-black"
                    : "rounded-r-xl bg-black"
                  : "bg-black/60"
              } hover:bg-[#333] p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
                theme == "dark" ? "dark" : ""
              }`}
            >
              {t("Ideas")}
            </button>
            <button
              onClick={() => navigate("project")}
              className={`${
                window.top.location.pathname.includes("project")
                  ? props.lng == "ar"
                    ? "rounded-l-xl bg-black"
                    : "rounded-r-xl bg-black"
                  : "bg-black/60"
              } hover:bg-[#333] p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
                theme == "dark" ? "dark" : ""
              }`}
            >
              {t("Task Management")}
            </button>
            <button
              onClick={() => navigate("team-member")}
              className={`${
                window.top.location.pathname.includes("team-member")
                  ? props.lng == "ar"
                    ? "rounded-l-xl bg-black"
                    : "rounded-r-xl bg-black"
                  : "bg-black/60"
              } hover:bg-[#333] p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
                theme == "dark" ? "dark" : ""
              }`}
            >
              {t("Team Members")}
            </button>
          </>
        )}

        <button
          onClick={() => navigate("profile")}
          className={`${
            window.top.location.pathname.includes("profile")
              ? props.lng == "ar"
                ? "rounded-l-xl bg-black"
                : "rounded-r-xl bg-black"
              : "bg-black/60"
          } hover:bg-[#333] p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
            theme == "dark" ? "dark" : ""
          }`}
        >
          {t("Profile")}
        </button>
        <button
          onClick={() => {
            dispatch(logout()), navigate("/");
          }}
          className={`bg-black hover:bg-[#333] p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
            theme == "dark" ? "dark" : ""
          }`}
        >
          {t("Logout")}
        </button>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => handleChangeLan(props.lng == "ar" ? "en" : "ar")}
            className="bg-black hover:bg-[#333] p-2 px-3 text-white rounded-xl cursor-pointer transition-all duration-200"
          >
            {props.lng == "ar" ? "En" : "Ar"}
          </button>
          <button
            onClick={() => dispatch(changeTheme())}
            className="bg-black hover:bg-[#333] p-2 px-3 text-white rounded-xl cursor-pointer transition-all duration-200"
          >
            {theme == "dark" ? <LuSunMedium /> : <FaRegMoon />}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
