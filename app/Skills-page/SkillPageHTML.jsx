"use client";
import React from "react";
import MobileSkillsHtml from "../mobileSkills/mobileSkillsHTML";
import "../typography.scss";
import {useTranslation} from "react-i18next";
import SkillPyramid from "../skill-Pyramid/page";

const SkillPageHtml = ({size}) => {
  // imported from library
  const {t} = useTranslation();
  return (
      <div>
        { size.width < 630 ? <div><MobileSkillsHtml/></div> :
          <SkillPyramid/>
        }
      </div>
  );
};

export default SkillPageHtml;
