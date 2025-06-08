import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FormGroup from "../components/FormGroup";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

function Register() {
  const [formDate, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  let lng = Cookies.get("i18next") || "ar";
  window.document.title =
    lng == "ar" ? "مُدار | تسجيل جديد" : "Modar | Register";

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formDate, [name]: value });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (formDate.password !== formDate.confirmPassword) {
      toast.error(t("Passwords Doesn't Match"));
      return;
    }
    axios.post(`https://68457ab9fc51878754db71db.mockapi.io/users`, {
      username: formDate.username,
      email: formDate.email,
      password: formDate.password,
      role: "Student",
    });
    toast.success(t("Register successfully"));
    navigate("/auth/login");
  };

  return (
    <section className="login-section flex justify-center items-center h-[80vh] w-full">
      <div className="login-content flex justify-center w-[80%]">
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-5 bg-white/40 rounded-2xl p-5 w-[30rem]  "
        >
          <div className="text-center border-b">
            {/* <h1 className="text-3xl font-faseh">{t("Welcome Again")}</h1> */}
            <h1 className="text-3xl font-faseh">{t("Register")}</h1>
          </div>

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
            {t("Register")}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Register;
