import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function Loader() {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div
      className={`animate-pulse flex flex-col justify-center items-center bg-white/30 dark:bg-gray-900/80 dark:text-white backdrop-blur-2xl rounded-xl w-[80vw] ${
        theme == "dark" ? "dark" : ""
      }`}
    >
      {" "}
      <div className="flex flex-col font-faseh text-5xl/8">
        <h1>مُــــــدار</h1>
        <h1>Modar</h1>
      </div>
      <h1 className="font-rubik">{t("Loading")}...</h1>
    </div>
  );
}

export default Loader;
