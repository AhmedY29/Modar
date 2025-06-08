import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";

function Navbar(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChangeLan = (lng) => {
    props.changeLanguage(lng);
  };
  return (
    <nav className="nav-section sticky top-0 w-full flex justify-center bg-linear-to-b from-white/80 to-white/30 backdrop-blur-lg z-10">
      <div className="nav-content flex items-center justify-between w-[95%]">
        <Link to={"/"}>
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
        <div className="btn flex gap-3 lg:w-[15%]">
          <button className="bg-black hover:bg-[#333] w-fit p-2 px-3 rounded-xl text-white cursor-pointer transition-all duration-200">
            N
          </button>
          <button
            onClick={() => handleChangeLan(props.lng == "ar" ? "en" : "ar")}
            className="bg-black hover:bg-[#333] w-fit p-2 px-3 rounded-xl text-white cursor-pointer transition-all duration-200"
          >
            {props.lng == "ar" ? "En" : "Ar"}
          </button>
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-black hover:bg-[#333] w-full p-2 px-3 rounded-xl text-white cursor-pointer transition-all duration-200"
          >
            {t("Get Started")}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
