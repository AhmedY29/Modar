import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FormGroup from "../components/FormGroup";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import SwitchPage from "../components/SwitchPage";

function Login() {
  const [formDate, setFormData] = useState({
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const { t } = useTranslation();
  let lng = Cookies.get("i18next") || "ar";
  window.document.title =
    lng == "ar" ? "مُدار | تسجيل الدخول" : "Modar | Login";

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formDate, [name]: value });
  };
  useEffect(() => {
    axios
      .get("https://68457ab9fc51878754db71db.mockapi.io/users")
      .then((res) => setUsers(res.data));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    let userExist = users.find(
      (user) =>
        user.email == formDate.email && user.password == formDate.password
    );

    if (!userExist) {
      toast.error(t("Email or Password Invalid"));
      return;
    }

    toast.success(t("Login successfully"));
    navigate("/home");
  };

  return (
    <section className="login-section flex justify-center items-center h-[80vh] w-full">
      <div className="login-content flex justify-center w-[80%]">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5 bg-white/40 rounded-2xl p-5 w-[30rem]  "
        >
          <div className="text-center border-b">
            <h1 className="text-3xl font-faseh">{t("Welcome Again")}</h1>
            <h1 className="text-3xl font-faseh">{t("Login")}</h1>

            <SwitchPage />
          </div>

          <FormGroup
            type={"email"}
            name={"email"}
            id={"email"}
            value={formDate.email}
            onChange={handleChangeInput}
            label={"Email"}
            placeholder={"Enter Your Email"}
          />

          <FormGroup
            type={"password"}
            name={"password"}
            id={"password"}
            value={formDate.password}
            onChange={handleChangeInput}
            label={"Password"}
            placeholder={"Enter Your Password"}
          />

          <div className="flex justify-between">
            <div className="flex gap-1">
              <input type="checkbox" name="check" id="check" />
              <label className="text-sm" htmlFor="check">
                {t("Check Me")}
              </label>
            </div>
            <h1 className="text-sm text-blue-400 underline hover:no-underline cursor-pointer">
              {t("Forget Password?")}
            </h1>
          </div>
          <button className="bg-black hover:bg-[#333] w-full p-2 px-3 rounded-xl text-white cursor-pointer transition-all duration-200">
            {t("Login")}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
