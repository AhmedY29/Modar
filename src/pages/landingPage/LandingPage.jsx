import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  let lng = Cookies.get("i18next") || "ar";
  window.document.title =
    lng == "ar" ? "مُدار | الصفحة الرئيسية" : "Modar | Landing Page";

  return (
    <section className="landing flex justify-center m-5 rounded-2xl bg-white/30 backdrop-blur-2xl text-black ">
      <div className="landing-content flex justify-center items-center text-balance w-[80%] h-full my-10 lg:my-0 py-10">
        <div className="landing-hero flex flex-col md:flex-row justify-between items-center w-full">
          <div className="landing-text">
            <h1 className="text-7xl/15 font-faseh ">{t("Hero headline")}</h1>
            <p className="font-rubik font-medium text-2xl my-5 ">
              {t(`Hero subtitle`)}
            </p>
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-black hover:bg-[#333] p-2 px-4 rounded-xl text-white cursor-pointer transition-all duration-200"
            >
              {t("Get Started")}
            </button>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4661/4661361.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
