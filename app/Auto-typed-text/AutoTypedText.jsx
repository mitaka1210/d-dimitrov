"use client";
import React, {useEffect, useRef} from "react";
import Typed from "typed.js";
import "./auto-type.scss";
import {useTranslation} from "react-i18next";

const AutoTypedText = () => {
  const el = useRef(null);
  let lang = localStorage.getItem("i18nextLng");
  const {t} = useTranslation();
  const langBG = ["Front-end Програмист", "Акварист", "Дизайнер", "Програмист" +
  " на свободна практика", "Авиационен инженер"];
  const langEN = ["Front-end Developer", "Aquarist", "Designer", "Freelancer", "Aviation engineer"];

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: lang === "bg" ? langBG : langEN,
      typeSpeed: 150,
      loop: true,
      loopCount: Infinity,
      cursorChar: "|"
    });
    return () => {
      typed.destroy();
    };
  }, [lang]);
  return (
    <div>
      <h4>
        {t("andIam")} <span className="who-am-i" ref={el}/>
      </h4>
    </div>
  );
};

export default AutoTypedText;
