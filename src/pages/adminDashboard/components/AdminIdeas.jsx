import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IoAdd } from "react-icons/io5";
import { addIdea, getTeams } from "../../../redux/teamSlice";
import Dialog from "../../../components/Dialog";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

// React Icon

import { TbLoader2 } from "react-icons/tb";
import FormGroup from "../../auth/components/FormGroup";
import IdeasCard from "../../home/components/ideas/IdeasCard";

function AdminIdeas() {
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth.user);
  const teams = useSelector((state) => state.team.teams);
  const isLoading = useSelector((state) => state.team.isLoading);
  const [openDialog, setOpenDialog] = useState(false);
  const [teamId, setTeamId] = useState(0);
  const [myTeam, setMyTeam] = useState({});
  const [ideaData, setIdeaData] = useState({
    ideaId: uuidv4(),
    authorName: user?.username,
    teamId: "",
    ideaTitle: "",
    ideaDesc: "",
    category: "",
    status: "Pending",
  });
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(getTeams());
  }, []);
  useEffect(() => {
    setMyTeam(
      teams.find((team) => team.students?.includes(user.username)) ??
        teams.find((team) => team.supervisor == user.username)
    );
  }, [teams]);
  useEffect(() => {
    if (user.role == "teacher") {
      setMyTeam(
        teams.filter((team) => team.supervisor == user.username)[teamId]
      );
    }
  }, [user, teams, teamId]);

  console.log(teams.filter((team) => team.supervisor == user.username));
  console.log(
    teams.find((team) => team.students?.includes(user.username)),
    "ss"
  );
  let lng = Cookies.get("i18next") || "ar";
  window.document.title =
    lng == "ar" ? "مُدار - المشرفين | الافكار" : "Modar - Admin | Ideas";

  const handleAddIdea = (e) => {
    e.preventDefault();
    dispatch(addIdea(ideaData)).then(() =>
      setTimeout(() => {
        dispatch(getTeams());
        setOpenDialog(false);
        setIdeaData({
          teamId: "",
          ideaId: "",
          ideaTitle: "",
          ideaDesc: "",
          category: "",
          status: "Pending",
        });
        toast.success("Add Idea Successfully");
      }, 1000)
    );
  };

  return (
    <section
      className={`flex flex-col gap-5 w-full bg-gray-200/50 dark:bg-slate-900/60 mx-5 rounded-xl p-10 ${
        theme == "dark" ? "dark" : ""
      }`}
    >
      {/* <div className="w">
        <TeacherInfo
          supervisor={myTeam?.supervisor}
          students={myTeam?.students}
        />
      </div> */}
      <div className="ideas-content p-2 bg-white/40 rounded-xl">
        {/* <div className="flex flex-col">
          <label htmlFor="teams">{t("Select Team")}</label>
          <select
            className="border rounded-xl p-1 px-2"
            onChange={(e) => setTeamId(e.target.value)}
            name="teams"
            id=""
          >
            {teams
              ?.filter((team) => team.supervisor == user.username)
              ?.map((team, index) => (
                <option value={index}>
                  {t("Team")}
                  {team.students.map((e) => (
                    <h1 className="flex gap-2"> {e} </h1>
                  ))}
                </option>
              ))}
          </select>
        </div> */}
        <div
          className={`flex w-full rounded-xl ${theme == "dark" ? "dark" : ""}`}
        >
          <div className="w-full">
            <FormGroup
              label={"Search"}
              type={"text"}
              placeholder={"Search Idea"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="ideas bg-white/40 p-2 rounded-xl">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl">{t("Ideas")}</h1>
            {user.role != "teacher" ? (
              <button
                onClick={() => setOpenDialog(true)}
                className={`flex items-center gap-2 bg-black hover:bg-[#333] px-10 p-1 text-white cursor-pointer ${
                  theme == "dark" ? "dark" : ""
                } rounded-xl transition-all duration-200 `}
              >
                <IoAdd />
                <span>{t("Add Idea")}</span>
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="ideas-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {myTeam?.ideas?.length == 0 ? (
              <div className="">
                <h1>There is No Ideas yet</h1>
              </div>
            ) : (
              teams.map((team) =>
                team.ideas
                  ?.filter((idea) => idea.ideaTitle.includes(search))
                  .map((idea) => (
                    <IdeasCard
                      key={idea.ideaId}
                      id={idea.ideaId}
                      teamId={team.id}
                      ideaTitle={idea.ideaTitle}
                      rejectedReason={idea.rejectedReason}
                      authorName={idea.authorName}
                      ideaDesc={idea.ideaDesc}
                      category={idea.category}
                      status={idea.status}
                    />
                  ))
              )
            )}
          </div>
        </div>
      </div>
      <Dialog open={openDialog} setOpenDialog={setOpenDialog}>
        <form onSubmit={handleAddIdea} className="w-full">
          <FormGroup
            label={"Idea"}
            type={"text"}
            placeholder={"Enter Your Idea"}
            value={ideaData.ideaTitle}
            onChange={(e) =>
              setIdeaData({
                ...ideaData,
                ideaTitle: e.target.value,
                teamId: myTeam.id,
              })
            }
          />
          <label htmlFor="ideaDesc">{t("Description Idea")}</label>
          <textarea
            name="ideaDesc"
            id="ideaDesc"
            rows={2}
            className="w-full border rounded-xl p-2"
            value={ideaData.ideaDesc}
            placeholder={t("Enter Description Idea")}
            onChange={(e) =>
              setIdeaData({ ...ideaData, ideaDesc: e.target.value })
            }
          ></textarea>
          <div className="flex flex-col mb-2">
            <label htmlFor="category">{t("Category")}</label>
            <select
              className="border p-2 px-3 rounded-xl"
              name="category"
              id="category"
              onChange={(e) =>
                setIdeaData({ ...ideaData, category: e.target.value })
              }
            >
              <option value="">{t("Select")}</option>
              <option value="Web App">{t("Web App")}</option>
              <option value="Mobile App">{t("Mobile App")}</option>
            </select>
          </div>
          <button
            className={`flex items-center justify-center bg-black hover:bg-[#333] px-10 p-4 text-white cursor-pointer ${
              theme == "dark" ? "dark" : ""
            } rounded-xl transition-all duration-200 w-full `}
          >
            {isLoading ? <TbLoader2 className="animate-spin" /> : t("Add")}
          </button>
        </form>
      </Dialog>
    </section>
  );
}

export default AdminIdeas;
