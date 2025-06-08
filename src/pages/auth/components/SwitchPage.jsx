import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

function SwitchPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  console.log(window.top.location.pathname);
  return (
    <div className="flex gap-2 my-5 bg-gray-100 p-2 rounded-xl">
      <div className="rounded-xl p-1 flex w-full">
        <button
          onClick={() => navigate("/auth/login")}
          className={`${
            window.top.location.pathname == "/auth/login"
              ? "bg-black text-white"
              : "bg-none border text-black hover:text-white "
          } hover:bg-[#333] w-full p-2 px-3 rounded-xl cursor-pointer transition-all duration-200`}
        >
          {t("Login")}
        </button>
        <button
          onClick={() => navigate("/auth/register")}
          className={`${
            window.top.location.pathname == "/auth/register"
              ? "bg-black text-white"
              : "bg-none border text-black hover:text-white "
          } hover:bg-[#333] w-full p-2 px-3 rounded-xl  cursor-pointer transition-all duration-200`}
        >
          {t("Register")}
        </button>
      </div>
    </div>
  );
}

export default SwitchPage;
