import React, { useEffect, useState } from "react";
import FormGroup from "../../auth/components/FormGroup";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import TeacherInfo from "../../home/components/ideas/TeacherInfo";
import IdeasCard from "../../home/components/ideas/IdeasCard";
import Dialog from "../../../components/Dialog";
import { getUsers } from "../../../redux/authSlice";
import { addTeam, deleteTeam, getTeams } from "../../../redux/teamSlice";
import toast from "react-hot-toast";

// React Icon
import { IoAdd } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";

function Teams() {
  const theme = useSelector((state) => state.theme.theme);
  const users = useSelector((state) => state.auth.users);
  const teams = useSelector((state) => state.team.teams);
  const isLoading = useSelector((state) => state.team.isLoading);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [formTeam, setFormTeam] = useState({
    supervisor: "",
    students: [],
  });

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTeams());
  }, []);
  console.log(teams, "teams");
  // TODO: Make Title For Page
  let lng = Cookies.get("i18next") || "ar";
  window.document.title = lng == "ar" ? "مُدار | المحموعات" : "Modar | Teams";

  const handleAddTeam = (e) => {
    e.preventDefault();
    dispatch(addTeam(formTeam)).then(() =>
      setTimeout(() => {
        dispatch(getTeams());
      }, 500)
    );
    toast.success("Add Team Successfully");
    setOpenDialog(false);
  };
  const handleDeleteTeam = (id) => {
    dispatch(deleteTeam(id)).then(() =>
      setTimeout(() => {
        dispatch(getTeams());
      }, 500)
    );
  };

  console.log(isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <section
      className={`flex flex-col gap-5 w-full bg-gray-200/60 dark:bg-slate-900/60 mx-5 rounded-xl p-10 ${
        theme == "dark" ? "dark" : ""
      }`}
    >
      <div className="w">
        <div className="flex flex-col md:flex-row gap-3 justify-between text-2xl font-rubik w-full">
          <div className="bg-white/40 rounded-xl p-5 w-full">
            <h1 className="text-sm">{t("Teams Count")}</h1>
            <h1 className="">{teams?.length}</h1>
          </div>
        </div>
      </div>
      <div className="ideas-content">
        <div className="ideas bg-white/40 p-2 rounded-xl">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl">{t("Teams")}</h1>
            <button
              onClick={() => setOpenDialog(true)}
              className={`flex items-center gap-2 bg-black hover:bg-[#333] dark:bg-cyan-500 dark:hover:bg-cyan-600 px-10 p-1 text-white cursor-pointer ${
                theme == "dark" ? "dark" : ""
              } rounded-xl transition-all duration-200 `}
            >
              <IoAdd />
              <span>{t("Add Team")}</span>
            </button>
          </div>
          {teams.length == 0 ? (
            <div className="text-center">There is No Teams yet</div>
          ) : (
            <div className="ideas-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {teams.map((team) => (
                <div
                  className={`flex flex-col gap-5 bg-zinc-300/50 dark:bg-gray-800 dark:text-white rounded-xl p-4 ${
                    theme == "dark" ? "dark" : ""
                  } `}
                >
                  <div className="cat flex justify-between">
                    <h1 className="bg-blue-400 text-blue-900 p-1 px-2 font-light rounded-xl uppercase">
                      supervisor
                    </h1>
                    <h1>{team.supervisor}</h1>
                  </div>
                  <div className="idea">
                    <h1 className="font-bold">Idea Title</h1>
                    {team.students.map((stud) => (
                      <p
                        className={`text-black/60 dark:text-white/60 break-words line-clamp-2 ${
                          theme == "dark" ? "dark" : ""
                        }`}
                      >
                        {stud}
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <div className="status w-fit">
                      <button
                        onClick={() => handleDeleteTeam(team.id)}
                        className="flex items-center bg-red-400 text-red-900 p-1 px-2 cursor-pointer font-light rounded-xl"
                      >
                        <span>{t("Delete")}</span>{" "}
                        <MdDeleteOutline fontSize={20} />
                      </button>
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
              ))}
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={openDialog}
        setOpenDialog={setOpenDialog}
        title={"Add Team"}
      >
        <form
          onSubmit={handleAddTeam}
          className="flex flex-col items-center justify-center gap-4 text-center"
        >
          <div className="select-group flex flex-col">
            <label htmlFor="selectSupervisor">Supervisor</label>
            <select
              className="border p-2 px-3 rounded-xl"
              name="selectSupervisor"
              id="selectSupervisor"
              onChange={(e) =>
                setFormTeam({ ...formTeam, supervisor: e.target.value })
              }
            >
              <option value="">Select</option>
              {users
                .filter((user) => user.role == "teacher")
                .map((teacher) => (
                  <option key={teacher.id} value={teacher.username}>
                    {teacher.username}
                  </option>
                ))}
            </select>
          </div>
          <div className="select-group flex flex-col">
            <label htmlFor="selectStudent">Student</label>
            <select
              className="border p-2 px-3 rounded-xl "
              name="selectStudent"
              id="selectStudent"
              onChange={(e) =>
                setFormTeam({
                  ...formTeam,
                  students: [...formTeam.students, e.target.value],
                })
              }
            >
              <option value="">Select</option>
              {users
                .filter(
                  (user) =>
                    user.role == "student" &&
                    !formTeam.students.includes(user.username)
                )
                .map((student) => (
                  <option key={student.id} value={student.username}>
                    {student.username}
                  </option>
                ))}
            </select>
            <div className={`${formTeam.students ? "block" : ""}`}>
              <h1>Student</h1>
              {formTeam?.students?.map((stud) => (
                <div className="flex justify-between">
                  <h1>{stud}</h1>
                  <h1
                    className="bg-red-400 rounded-full text-red-900 px-2 cursor-pointer"
                    onClick={() =>
                      setFormTeam({
                        ...formTeam,
                        students: formTeam.students.filter(
                          (stude) => stude != stud
                        ),
                      })
                    }
                  >
                    X
                  </h1>
                </div>
              ))}
            </div>
          </div>
          <button
            disabled={formTeam?.students?.length == 0}
            type="submit"
            className={`flex items-center gap-2 bg-black hover:bg-[#333] dark:bg-cyan-500 dark:hover:bg-cyan-600 px-10 p-1 text-white  ${
              formTeam?.students?.length == 0
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } ${
              theme == "dark" ? "dark" : ""
            } rounded-xl transition-all duration-200 `}
          >
            Add
          </button>
        </form>
      </Dialog>
    </section>
  );
}

export default Teams;
