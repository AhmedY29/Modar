import React, { useEffect, useState } from "react";
import FormGroup from "../../auth/components/FormGroup";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "../../../components/Dialog";
import { deleteMember, getUsers, register } from "../../../redux/authSlice";
import { getTeams } from "../../../redux/teamSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

// React Icon
import { IoAdd } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

function Students() {
  const theme = useSelector((state) => state.theme.theme);
  const users = useSelector((state) => state.auth.users);
  const teams = useSelector((state) => state.team.teams);
  const isLoading = useSelector((state) => state.team.isLoading);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [teacherId, setTeacherId] = useState(false);
  const { t } = useTranslation();
  const [formDate, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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

    dispatch(register(formDate)).then(() => dispatch(getUsers()));
    toast.success(t("Add Teacher successfully"));
    setOpenDialog(false);
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formDate, [name]: value });
  };

  const handleOpenDelete = (id) => {
    setOpenDeleteDialog(true);
    setTeacherId(id);
  };
  const handleDeleteAction = () => {
    dispatch(deleteMember(teacherId)).then(() =>
      setTimeout(() => {
        toast.success("Delete Successfully");
        dispatch(getUsers());
        setTeacherId("");
        setOpenDeleteDialog(false);
      }, 1000)
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
            <h1 className="text-sm">{t("Students Count")}</h1>
            <h1 className="">
              {users.filter((user) => user.role == "student")?.length}
            </h1>
          </div>
        </div>
      </div>
      <div className="ideas-content">
        <div className="ideas bg-white/40 p-2 rounded-xl">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl">{t("Students")}</h1>
            <button
              onClick={() => setOpenDialog(true)}
              className={`flex items-center gap-2 bg-black hover:bg-[#333] dark:bg-cyan-500 dark:hover:bg-cyan-600 px-10 p-1 text-white cursor-pointer ${
                theme == "dark" ? "dark" : ""
              } rounded-xl transition-all duration-200 `}
            >
              <IoAdd />
              <span>{t("Add Student")}</span>
            </button>
          </div>
          {users.filter((user) => user.role == "student").length == 0 ? (
            <div className="text-center">There is No Students yet</div>
          ) : (
            // <div className="ideas-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            //   {users
            //     .filter((user) => user.role == "student")
            //     .map((student) => (
            //       <div
            //         className={`flex flex-col gap-5 bg-zinc-300/50 dark:bg-gray-800 dark:text-white rounded-xl p-4 ${
            //           theme == "dark" ? "dark" : ""
            //         } `}
            //       >
            //         <div className="cat flex justify-between">
            //           <h1 className="bg-blue-400 text-blue-900 p-1 px-2 font-light rounded-xl uppercase">
            //             supervisor by{" "}
            //             {
            //               teams.filter(
            //                 (team) => team.supervisor == student.username
            //               ).length
            //             }
            //           </h1>
            //           <h1>{student.username}</h1>
            //         </div>
            //         <div className="flex justify-between">
            //           <div className="status w-fit">
            //             <button className="flex items-center bg-red-400 text-red-900 p-1 px-2 cursor-pointer font-light rounded-xl">
            //               <span>{t("Delete")}</span>{" "}
            //               <MdDeleteOutline fontSize={20} />
            //             </button>
            //           </div>
            //           <div className="details">
            //             <button
            //               className={`bg-black hover:bg-[#333] dark:bg-cyan-500 dark:hover:bg-cyan-600 p-2 px-3 text-white ${
            //                 theme == "dark" ? "dark" : ""
            //               } rounded-xl cursor-pointer transition-all duration-200`}
            //             >
            //               {t("Details")}
            //             </button>
            //           </div>
            //         </div>
            //       </div>
            //     ))}
            // </div>
            ""
          )}
          <table class="border-separate border border-gray-400 w-full">
            <thead>
              <tr>
                <th class="border border-gray-300 ...">State</th>
                <th class="border border-gray-300 ...">action</th>
              </tr>
            </thead>
            {users
              ?.filter((user) => user.role == "student")
              .map((student) => (
                <tbody className="text-center">
                  <tr>
                    <td class="border border-gray-300 ...">
                      {student.username}
                    </td>
                    <td class="border border-gray-300 ...">
                      <button
                        className={`bg-red-500 hover:bg-red-600 px-3 p-2 text-white cursor-pointer rounded-xl transition-all duration-200`}
                        onClick={() => handleOpenDelete(student.id)}
                      >
                        {t("Delete")}
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
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

      <Dialog
        open={openDeleteDialog}
        setOpenDialog={setOpenDeleteDialog}
        title={"Delete"}
      >
        <h1 className="font-bold my-4">
          Are you Sure, Do you wants Delete Teacher
        </h1>
        <div className="flex flex-wrap gap-3">
          <button
            className="bg-black hover:bg-[#333] px-3 p-2 text-white cursor-pointer rounded-xl transition-all duration-200"
            onClick={handleDeleteAction}
          >
            {isLoading ? <TbLoader2 className="animate-spin" /> : "Sure"}
          </button>
          <button
            className="bg-black hover:bg-[#333] px-3 p-2 text-white cursor-pointer rounded-xl transition-all duration-200"
            onClick={() => setOpenDeleteDialog(false)}
          >
            Cancel
          </button>
        </div>
      </Dialog>
    </section>
  );
}

export default Students;
