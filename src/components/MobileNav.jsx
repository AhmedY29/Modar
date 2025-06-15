import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { logout } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

// React Icon
import { FaRegLightbulb } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";

function MobileNav() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(window.top.location.pathname);
  return (
    <section className="lg:hidden w-full h-20 bg-amber-300 sticky bottom-0 text-white rounded-t-xl">
      <div className="flex justify-center items-center text-2xl gap-0.5 h-full px-1.5">
        {user.role == "admin" ? (
          <>
            <button
              onClick={() => navigate("info")}
              className={`${
                window.top.location.pathname.includes("info")
                  ? "bg-[#333]"
                  : "bg-black"
              } flex flex-col justify-center items-center  text-white h-[80%]  w-30 rounded-xl cursor-pointer `}
            >
              <FaRegLightbulb />
              <span className="text-sm">{t("General")}</span>
            </button>
            <button
              onClick={() => navigate("ideas")}
              className={`${
                window.top.location.pathname.includes("ideas")
                  ? "bg-[#333]"
                  : "bg-black"
              } flex flex-col justify-center items-center text-white h-[80%]  w-30 rounded-xl cursor-pointer `}
            >
              <FaTasks />
              <span className="text-sm">{t("Ideas")}</span>
            </button>
            <button
              onClick={() => navigate("teachers")}
              className={`${
                window.top.location.pathname.includes("teachers")
                  ? "bg-[#333]"
                  : "bg-black"
              } flex flex-col justify-center items-center text-white h-[80%]  w-30 rounded-xl cursor-pointer `}
            >
              <LiaChalkboardTeacherSolid />
              <span className="text-sm">{t("Teachers")}</span>
            </button>
            <button
              onClick={() => navigate("students")}
              className={`${
                window.top.location.pathname.includes("students")
                  ? "bg-[#333]"
                  : "bg-black"
              } flex flex-col justify-center items-center text-white h-[80%]  w-30 rounded-xl cursor-pointer `}
            >
              <PiStudent />
              <span className="text-sm">{t("Students")}</span>
            </button>
            <button
              onClick={() => navigate("teams")}
              className={`${
                window.top.location.pathname.includes("teams")
                  ? "bg-[#333]"
                  : "bg-black"
              } flex flex-col justify-center items-center text-white h-[80%]  w-30 rounded-xl cursor-pointer `}
            >
              <RiTeamLine />
              <span className="text-sm">{t("Teams")}</span>
            </button>
            <button
              onClick={() => navigate("profile")}
              className={`${
                window.top.location.pathname.includes("profile")
                  ? "bg-[#333]"
                  : "bg-black"
              } flex flex-col justify-center items-center text-white h-[80%]  w-30 rounded-xl cursor-pointer `}
            >
              <IoPersonCircleOutline />
              <span className="text-sm">{t("Profile")}</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("ideas")}
              className={`${
                window.top.location.pathname.includes("ideas")
                  ? "bg-[#333]"
                  : "bg-black"
              } flex flex-col justify-center items-center  text-white h-[80%]  w-30 rounded-xl cursor-pointer `}
            >
              <FaRegLightbulb />
              <span className="text-sm">{t("Ideas")}</span>
            </button>
            {/* <button
              onClick={() => navigate("project")}
              className={`${
                window.top.location.pathname.includes("project")
                  ? "bg-[#333]"
                  : "bg-black"
              } flex flex-col justify-center items-center text-white h-[80%]  w-30 rounded-xl cursor-pointer `}
            >
              <FaTasks />
              <span className="text-sm">{t("Task Management")}</span>
            </button> */}
            <button
              onClick={() => navigate("team-member")}
              className={`${
                window.top.location.pathname.includes("team-member")
                  ? "bg-[#333]"
                  : "bg-black"
              } flex flex-col justify-center items-center text-white h-[80%]  w-30 rounded-xl cursor-pointer `}
            >
              <RiTeamLine />
              <span className="text-sm">{t("Team Member")}</span>
            </button>
            <button
              onClick={() => navigate("profile")}
              className={`${
                window.top.location.pathname.includes("profile")
                  ? "bg-[#333]"
                  : "bg-black"
              } flex flex-col justify-center items-center text-white h-[80%]  w-30 rounded-xl cursor-pointer `}
            >
              <IoPersonCircleOutline />
              <span className="text-sm">{t("Profile")}</span>
            </button>
            <button
              onClick={() => {
                dispatch(logout()), navigate("/");
              }}
              className={`flex flex-col justify-center items-center bg-black text-white h-[80%]  w-30 rounded-xl cursor-pointer `}
            >
              <CiLogout />
              <span className="text-sm">{t("Logout")}</span>
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default MobileNav;
