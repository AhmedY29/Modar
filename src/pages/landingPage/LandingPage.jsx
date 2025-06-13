import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth.user);

  let lng = Cookies.get("i18next") || "ar";
  window.document.title =
    lng == "ar" ? "مُدار | الصفحة الرئيسية" : "Modar | Landing Page";

  return (
    <section
      className={`landing flex justify-center m-5 rounded-2xl ${
        theme == "dark" ? "dark" : ""
      } bg-white/30 dark:bg-gray-900/80 backdrop-blur-2xl text-black dark:text-white lg:h-[80vh] overflow-hidden `}
    >
      <div className="landing-content flex justify-center items-center text-balance w-[80%] h-full my-10 lg:my-0 py-10">
        <div className="landing-hero flex flex-col lg:flex-row justify-center text-center max-w-full lg:text-start md:justify-between gap-5 items-center w-full">
          <div className="landing-text">
            <h1 className="text-7xl/15 font-faseh ">{t("Hero headline")}</h1>
            <p className="font-rubik font-medium text-2xl  my-5 ">
              {t(`Hero subtitle`)}
            </p>
            <button
              onClick={() => navigate(user ? "/home/ideas" : "/auth/login")}
              className="relative group bg-black hover:bg-[#333] w-32 h-12 overflow-hidden rounded-xl text-white cursor-pointer transition-all duration-200"
            >
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                {user ? t("Home") : t("Get Started")}
              </span>
              <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 group-hover:-translate-y-0 ">
                {t("Register")}
              </span>
            </button>
          </div>
          <img
            className="object-contain lg:w-[25rem] xl:w-[50rem]"
            src="/hero-img.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
