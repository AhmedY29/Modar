import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// React Icon
import { IoAdd } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { getUsers } from "../../redux/authSlice";
import { getTeams } from "../../redux/teamSlice";
import Loader from "../../components/Loader";

function Profile() {
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth.user);
  const teams = useSelector((state) => state.team.teams);
  const isLoading = useSelector((state) => state.team.isLoading);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTeams());
  }, []);
  console.log(teams, "teams");
  // TODO: Make Title For Page
  let lng = Cookies.get("i18next") || "ar";
  window.document.title =
    user.role == "admin"
      ? lng == "ar"
        ? "مُدار - المشرفين | الملف الشخصي"
        : "Modar - Admin | Profile"
      : lng == "ar"
      ? "مُدار | الملف الشخصي"
      : "Modar | Profile";

  console.log(isLoading);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section
      className={`flex flex-col gap-5 w-full bg-gray-200/60 dark:bg-slate-900/60 mx-5 rounded-xl p-10 ${
        theme == "dark" ? "dark" : ""
      }`}
    >
      <div className="w">
        <div className="flex flex-col md:flex-row gap-3 justify-between text-2xl font-rubik w-full">
          <div className="bg-white/40 rounded-xl p-5 w-full">
            <h1 className="text-sm uppercase">{t(user.role)} </h1>
            <div className="flex items-center gap-3">
              <h1 className="rounded-full bg-green-300 text-green-900/60 border border-green-900/60 w-10 h-10 flex justify-center items-center">
                {user.username[0]}
              </h1>
              <div className="flex justify-between flex-wrap w-full">
                <h1 className="">{user.username}</h1>
                <h1 className="flex flex-wrap items-center gap-2">
                  <span>{t("Email")}:</span> <span>{user.email}</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
