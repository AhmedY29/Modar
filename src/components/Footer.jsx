import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

// React Icon
import { FaLinkedin } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";

function Footer() {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);
  return (
    <footer
      data-aos={"fade-up"}
      className={`footer-section flex justify-center bg-white/40 dark:bg-gray-900/80 dark:text-white backdrop-blur-2xl rounded-xl mt-20 m-5 ${
        theme == "dark" ? "dark" : ""
      }`}
    >
      <div className="footer-content w-[95%]">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
          <div className="logo flex items-center md:items-start flex-col gap-3 pt-2">
            {/* <img src="/logo.png" width={80} alt="logo" /> */}
            <div className="flex flex-col font-faseh text-5xl/8">
              <h1>مُــــــدار</h1>
              <h1>Modar</h1>
            </div>
            <p className="w-80 text-muted-foreground break-words">
              {t("Hero subtitle")}
            </p>
          </div>
          <div className="social-links flex gap-2 text-3xl">
            <a
              href="https://www.linkedin.com/in/ahmed-y-alsaleh/"
              target="_blank"
            >
              <FaLinkedin className="opacity-60 hover:opacity-100 transition-all duration-200" />
            </a>
            <a href="https://ahmed-alsaleh.netlify.app/" target="_blank">
              <TbWorldWww className="opacity-60 hover:opacity-100 transition-all duration-200" />
            </a>
            <a href="mailto:alsalehahmed02@gmail.com" target="_blank">
              <MdEmail className="opacity-60 hover:opacity-100 transition-all duration-200" />
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <h1 className="flex items-center gap-2 font-faseh text-2xl">
            {t("Made By")}
            <a
              className="underline "
              href="https://github.com/AhmedY29"
              target="_blank"
            >
              {t("Ahmed Alsaleh")}
            </a>
          </h1>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
