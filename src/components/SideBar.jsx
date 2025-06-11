import React from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// React Icon
import { LuSunMedium } from "react-icons/lu";
import { FaRegMoon } from "react-icons/fa";
import { changeTheme } from "../redux/themeSlice";

function SideBar(props) {
  const theme = useSelector((state) => state.theme.theme);
  console.log(theme);
  const dispatch = useDispatch();
  const handleChangeLan = (lng) => {
    props.changeLanguage(lng);
  };
  return (
    <aside
      className={`hidden md:block h-screen sticky top-0 rounded-xl pt-3 bg-amber-300 dark:bg-zinc-500 w-[12rem] ${
        theme == "dark" ? "dark" : ""
      }`}
    >
      <Link to={"/home"}>
        <div className="logo flex justify-center">
          <img src={"/logo.png"} width={100} alt="s" />
        </div>
      </Link>
      <div className="btns flex flex-col gap-4 justify-center h-full w-full">
        <button
          className={`bg-black hover:bg-[#333] dark:bg-zinc-700/40 dark:hover:bg-zinc-500/20 dark:text-black p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
            theme == "dark" ? "dark" : ""
          }`}
        >
          الافكار
        </button>
        <button
          className={`bg-black hover:bg-[#333] dark:bg-zinc-700/40 dark:hover:bg-zinc-500/20 dark:text-black p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
            theme == "dark" ? "dark" : ""
          }`}
        >
          المشاريع الفعلية
        </button>
        <button
          className={`bg-black hover:bg-[#333] dark:bg-zinc-700/40 dark:hover:bg-zinc-500/20 dark:text-black p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
            theme == "dark" ? "dark" : ""
          }`}
        >
          اعضاء الفريق
        </button>
        <button
          className={`bg-black hover:bg-[#333] dark:bg-zinc-700/40 dark:hover:bg-zinc-500/20 dark:text-black p-2 px-3 text-white cursor-pointer transition-all duration-200 ${
            theme == "dark" ? "dark" : ""
          }`}
        >
          الملف الشخصي
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
