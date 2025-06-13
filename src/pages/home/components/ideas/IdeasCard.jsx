import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function IdeasCard(props) {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  return (
    <div
      className={`flex flex-col gap-5 bg-zinc-300/50 dark:bg-gray-800 dark:text-white rounded-xl p-4 ${
        theme == "dark" ? "dark" : ""
      } `}
    >
      <div className="cat flex justify-between">
        <h1
          className={`${
            props.category == "Web App"
              ? "bg-blue-400 text-blue-900"
              : props.category == "Mobile App"
              ? "bg-amber-400 text-amber-900"
              : ""
          } p-1 px-2 font-medium rounded-xl uppercase`}
        >
          {t(props.category)}
        </h1>
      </div>
      <div className="idea">
        <h1 className="font-bold">{props.ideaTitle}</h1>
        <p
          className={`text-black/60 dark:text-white/60 break-words line-clamp-2 ${
            theme == "dark" ? "dark" : ""
          }`}
        >
          {props.ideaDesc}
        </p>
      </div>
      <div className="flex flex-wrap justify-between gap-5">
        <div className="status w-fit">
          <h1
            className={`${
              props.status == "Pending"
                ? "bg-gray-400/50 text-gray-900"
                : props.status == "Accept"
                ? "bg-green-200 text-green-900"
                : props.status == "Rejected"
                ? "bg-red-200 text-red-900"
                : ""
            }  p-1 px-2 font-medium rounded-xl`}
          >
            {t(props.status)}
          </h1>
        </div>
        <div className="details">
          <button
            className={`bg-black hover:bg-[#333] dark:bg-cyan-500 dark:hover:bg-cyan-600 p-2 px-3 text-white ${
              theme == "dark" ? "dark" : ""
            } rounded-xl cursor-pointer transition-all duration-200`}
          >
            {t("Details")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default IdeasCard;
