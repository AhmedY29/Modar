import React, { use } from "react";
import { useTranslation } from "react-i18next";

function TeacherInfo(props) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between text-2xl font-rubik w-full">
      <div className="bg-white/40 rounded-xl p-5 w-full">
        <h1 className="text-sm">{t("Supervisor Name")}</h1>
        <h1 className="">{props.supervisor}</h1>
      </div>
      <div className="bg-white/40 rounded-xl p-5 w-full h-full text-wrap">
        <h1 className="text-sm">
          {t("Team Member count")} {props.students?.length}
        </h1>
        <div className="flex flex-wrap gap-5">
          {props.students?.map((stud) => (
            <p>{stud}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherInfo;
