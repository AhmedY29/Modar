import React, { useEffect, useState } from "react";
import FormGroup from "../../auth/components/FormGroup";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import TeacherInfo from "../../home/components/ideas/TeacherInfo";
import IdeasCard from "../../home/components/ideas/IdeasCard";
import Dialog from "../../../components/Dialog";
import { addTeacher, getUsers } from "../../../redux/authSlice";
import { addTeam, deleteTeam, getTeams } from "../../../redux/teamSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// React Icon
import { IoAdd } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import Loader from "../../../components/Loader";

function TeamMember() {
  const theme = useSelector((state) => state.theme.theme);
  const users = useSelector((state) => state.auth.users);
  const user = useSelector((state) => state.auth.user);
  const teams = useSelector((state) => state.team.teams);
  const isLoading = useSelector((state) => state.team.isLoading);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [myTeam, setMyTeam] = useState({});
  const [teamId, setTeamId] = useState(0);
  const { t } = useTranslation();
  const [formDate, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTeams());
  }, []);
  console.log(teams, "teams");
  console.log(myTeam, "teamsss");
  let lng = Cookies.get("i18next") || "ar";
  window.document.title =
    lng == "ar" ? "مُدار | اعضاء الفريق" : "Modar | Team Member";

  const handleRegister = (e) => {
    e.preventDefault();
    if (formDate.password !== formDate.confirmPassword) {
      toast.error(t("Passwords Doesn't Match"));
      return;
    }
    if (!formDate.email.includes("tuwaiq")) {
      toast.error(t("Email Invalid"));
      return;
    }
    // axios.post(`https://68457ab9fc51878754db71db.mockapi.io/users`, {
    //   username: formDate.username,
    //   email: formDate.email,
    //   password: formDate.password,
    //   role: "Student",
    // });

    dispatch(addTeacher(formDate)).then(() => dispatch(getUsers()));
    toast.success(t("Add Teacher successfully"));
    setOpenDialog(false);
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formDate, [name]: value });
  };

  console.log(isLoading);
  console.log(
    teams
      .filter((team) => team.students?.filter((stud) => stud == user.username))
      .map((e) => e)
  );

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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section
      className={`flex flex-col gap-5 w-full bg-gray-200/60 dark:bg-slate-900/60 mx-5 rounded-xl p-10 ${
        theme == "dark" ? "dark" : ""
      }`}
    >
      {myTeam ? (
        <>
          <div className="w">
            <div className="flex flex-col md:flex-row gap-3 justify-between text-2xl font-rubik w-full">
              <div className="bg-white/40 rounded-xl p-5 w-full">
                <h1 className="text-sm">{t("Team Count")}</h1>
                <h1 className="">{myTeam?.students?.length}</h1>
              </div>
            </div>
          </div>
          <div className="ideas-content">
            {user?.role == "teacher" ? (
              <>
                <div className="flex flex-col bg-white/40 p-2 rounded-xl ">
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
                </div>
                <div
                  className={`flex w-full rounded-xl ${
                    theme == "dark" ? "dark" : ""
                  }`}
                >
                  <div className="w-full">
                    {/* <FormGroup
                label={"Search"}
                type={"text"}
                placeholder={"Search Idea"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              /> */}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            <div className="ideas bg-white/40 p-2 rounded-xl">
              <div className="flex justify-between mb-2">
                <h1 className="text-2xl">{t("Team Member")}</h1>
                {/* <button
              onClick={() => setOpenDialog(true)}
              className={`flex items-center gap-2 bg-black hover:bg-[#333] px-10 p-1 text-white cursor-pointer ${
                theme == "dark" ? "dark" : ""
              } rounded-xl transition-all duration-200 `}
            >
              <IoAdd />
              <span>{t("Add Teacher")}</span>
            </button> */}
              </div>
              {!myTeam ? (
                <div className="text-center">There is No Teachers yet</div>
              ) : (
                <div className="ideas-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  <div
                    className={`flex flex-col gap-5 bg-zinc-300/50 dark:bg-gray-800 dark:text-white rounded-xl p-4 ${
                      theme == "dark" ? "dark" : ""
                    } `}
                  >
                    <div className="cat flex justify-between">
                      <h1 className="bg-blue-400 text-blue-900 p-1 px-2 font-light rounded-xl uppercase">
                        supervisor by {myTeam?.supervisor}
                      </h1>
                    </div>
                    <div>
                      <h1 className="font-bold">{t("Students")}</h1>
                      {myTeam?.students?.map((e, index) => (
                        <h1 key={index}>{e}</h1>
                      ))}
                    </div>
                    {/* <div className="flex justify-between">
                  <div className="status w-fit">
                    <button className="flex items-center bg-red-400 text-red-900 p-1 px-2 cursor-pointer font-light rounded-xl">
                      <span>{t("Delete")}</span>{" "}
                      <MdDeleteOutline fontSize={20} />
                    </button>
                  </div>
                  <div className="details">
                    <button
                      className={`bg-black hover:bg-[#333] p-2 px-3 text-white ${
                        theme == "dark" ? "dark" : ""
                      } rounded-xl cursor-pointer transition-all duration-200`}
                    >
                      {t("Details")}
                    </button>
                  </div>
                </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Dialog
            open={openDialog}
            setOpenDialog={setOpenDialog}
            title={"Add New Teacher"}
          >
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <FormGroup
                type={"text"}
                name={"username"}
                id={"username"}
                label={"Username"}
                min={4}
                value={formDate.username}
                onChange={handleChangeInput}
                placeholder={"Enter Your Username"}
              />
              <FormGroup
                type={"email"}
                name={"email"}
                id={"email"}
                label={"Email"}
                value={formDate.email}
                onChange={handleChangeInput}
                placeholder={"Enter Your Email"}
              />

              <FormGroup
                type={"password"}
                name={"password"}
                id={"password"}
                label={"Password"}
                min={6}
                value={formDate.password}
                onChange={handleChangeInput}
                placeholder={"Enter Your Password"}
              />

              <FormGroup
                type={"password"}
                name={"confirmPassword"}
                id={"confirmPassword"}
                label={"Re-enter Password"}
                min={6}
                value={formDate.confirmPassword}
                onChange={handleChangeInput}
                placeholder={"Enter Your Re-enter Password"}
              />

              <button className="bg-black hover:bg-[#333] w-full p-2 px-3 rounded-xl text-white cursor-pointer transition-all duration-200">
                {t("Register")}
              </button>
            </form>
          </Dialog>
        </>
      ) : (
        <div className="flex justify-center">
          <h1>{t("You Don't have Supervisor yet")}</h1>
        </div>
      )}
    </section>
  );
}

export default TeamMember;
