import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../../../../components/Dialog";
import { getTeams, updateIdeaStatus } from "../../../../redux/teamSlice";
import toast from "react-hot-toast";
import FormGroup from "../../../auth/components/FormGroup";

function IdeasCard(props) {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [rejectedReason, setRejectedReason] = useState("");
  const [openRejectedDialog, setOpenRejectedDialog] = useState(false);
  const { t } = useTranslation();

  const handleRejected = (e) => {
    e.preventDefault();
    dispatch(
      updateIdeaStatus({
        teamId: props.teamId,
        ideaId: props.id,
        ideaTitle: props.ideaTitle,
        ideaDesc: props.ideaDesc,
        category: props.category,
        rejectedReason: rejectedReason,
        status: "Rejected",
      })
    ).then(() =>
      setTimeout(() => {
        toast.success(t("Update Status Successfully"));
        dispatch(getTeams());
        setRejectedReason("");
        setOpenRejectedDialog(false);
        setOpenDialog(false);
      }, 1000)
    );
  };
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
                : props.status == "Accepted"
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
            onClick={() => setOpenDialog(true)}
            className={`bg-black hover:bg-[#333] p-2 px-3 text-white ${
              theme == "dark" ? "dark" : ""
            } rounded-xl cursor-pointer transition-all duration-200`}
          >
            {t("Details")}
          </button>
        </div>
      </div>
      <Dialog
        open={openDialog}
        setOpenDialog={setOpenDialog}
        title={t("Details")}
      >
        <div className="my-2">
          <div className="">
            <h1 className="font-bold">{t("Idea")}</h1>
            <h1>{props.ideaTitle}</h1>
          </div>
          <div className="">
            <h1 className="font-bold">{t("Description Idea")}</h1>
            <p className="w-50">{props.ideaDesc}</p>
          </div>
          <div className="">
            <h1 className="font-bold">{t("Author Name")}</h1>
            <p className="w-50">{props.authorName}</p>
          </div>
          {props.rejectedReason ? (
            <div className="">
              <h1 className="font-bold">{t("Rejected Reason")}</h1>
              <p className="w-50">{props.rejectedReason}</p>
            </div>
          ) : (
            ""
          )}
          {user.role == "admin" || user.role == "teacher" ? (
            <div className="btns flex justify-center gap-3">
              <button
                onClick={() => setOpenRejectedDialog(true)}
                className={` bg-red-200 text-red-900 hover:bg-red-300 p-2 px-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  theme == "dark" ? "dark" : ""
                }`}
              >
                {t("Rejected")}
              </button>
              <button
                onClick={() =>
                  dispatch(
                    updateIdeaStatus({
                      teamId: props.teamId,
                      ideaId: props.id,
                      ideaTitle: props.ideaTitle,
                      ideaDesc: props.ideaDesc,
                      category: props.category,
                      status: "Accepted",
                    })
                  ).then(() =>
                    setTimeout(() => {
                      toast.success(t("Update Status Successfully"));
                      dispatch(getTeams());
                      setOpenDialog(false);
                    }, 1000)
                  )
                }
                className={` bg-green-200 text-green-900 hover:bg-green-300 p-2 px-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  theme == "dark" ? "dark" : ""
                }`}
              >
                {t("Accepted")}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </Dialog>
      <Dialog open={openRejectedDialog} setOpenDialog={setOpenRejectedDialog}>
        <form onSubmit={handleRejected}>
          <FormGroup
            label={"Rejected Reason"}
            type={"text"}
            id={"Rejected"}
            placeholder={"Enter Reject Reason"}
            value={rejectedReason}
            onChange={(e) => setRejectedReason(e.target.value)}
          />
          <button
            className={`bg-black hover:bg-[#333] p-2 px-3 text-white rounded-xl cursor-pointer transition-all duration-200`}
          >
            {t("Send")}
          </button>
        </form>
      </Dialog>
    </div>
  );
}

export default IdeasCard;
