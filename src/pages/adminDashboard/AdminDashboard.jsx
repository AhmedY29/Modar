import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

// React Icons
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { getTeams } from "../../redux/teamSlice";
import { getUsers } from "../../redux/authSlice";
import { UsersChart } from "./components/UsersChart";
import { StatData } from "./components/StatData";
import { useNavigate } from "react-router";

function AdminDashboard() {
  const theme = useSelector((state) => state.theme.theme);
  const users = useSelector((state) => state.auth.users);
  const teams = useSelector((state) => state.team.teams);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTeams());
  }, []);
  console.log(teams, "tems");
  const { t } = useTranslation();
  let lng = Cookies.get("i18next") || "ar";
  window.document.title =
    lng == "ar"
      ? "مُدار - المشرفين |  معلومات عامة"
      : "Modar - Admin | General";
  return (
    <section
      className={`flex flex-col gap-5 w-full bg-gray-200/60 dark:bg-slate-900/60 mx-5 rounded-xl p-10 ${
        theme == "dark" ? "dark" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row gap-2">
        <div className="bg-white/40 rounded-xl p-5 w-full">
          <div className="flex items-center justify-between flex-wrap">
            <h1 className="text-sm">{t("Teachers Count")}</h1>
            <button
              onClick={() => navigate("/admin_dashboard_modar_2977/teachers")}
              className="flex items-center gap-2 hover:bg-zinc-200 rounded-xl p-1 cursor-pointer transition-all duration-200"
            >
              {t("More")}{" "}
              {lng == "ar" ? (
                <IoIosArrowRoundBack fontSize={20} />
              ) : (
                <IoIosArrowRoundForward fontSize={20} />
              )}
            </button>
          </div>
          <h1 className="">
            {users.filter((user) => user.role == "teacher").length}
          </h1>
        </div>
        <div className="bg-white/40 rounded-xl p-5 w-full">
          <div className="flex items-center justify-between flex-wrap">
            <h1 className="text-sm">{t("Students Count")}</h1>
            <button
              onClick={() => navigate("/admin_dashboard_modar_2977/students")}
              className="flex items-center gap-2 hover:bg-zinc-200 rounded-xl p-1 cursor-pointer transition-all duration-200"
            >
              {t("More")}{" "}
              {lng == "ar" ? (
                <IoIosArrowRoundBack fontSize={20} />
              ) : (
                <IoIosArrowRoundForward fontSize={20} />
              )}
            </button>
          </div>
          <h1 className="">
            {users.filter((user) => user.role == "student").length}
          </h1>
        </div>
        <div className="bg-white/40 rounded-xl p-5 w-full">
          <div className="flex items-center justify-between flex-wrap">
            <h1 className="text-sm">{t("Teams Count")}</h1>
            <button
              onClick={() => navigate("/admin_dashboard_modar_2977/teams")}
              className="flex items-center gap-2 hover:bg-zinc-200 rounded-xl p-1 cursor-pointer transition-all duration-200"
            >
              {t("More")}{" "}
              {lng == "ar" ? (
                <IoIosArrowRoundBack fontSize={20} />
              ) : (
                <IoIosArrowRoundForward fontSize={20} />
              )}
            </button>
          </div>
          <h1 className="">{teams.length}</h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="md:w-[50%]">
          <UsersChart />
        </div>
        <div className="md:w-[50%]">
          <StatData />
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
