'use client'

import React, {useEffect, useRef, useState} from 'react';
import './skill.scss';
import useWindowSize from "../Helper-components/getWindowSize/windowSize";
import dynamic from "next/dynamic";
const SkillPageHtml = dynamic(
    () => import('./SkillPageHTML'),
    {ssr: false}
);
const FooterHTML = dynamic(
    () => import('../Footer-page/page'),
    {ssr: false}
);
const Navigation = dynamic(
    () => import('../Navigation-component/navigation'),
    {ssr: false}
);
const Page = () => {
  const size = useWindowSize();
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const storedLang  = localStorage.getItem("i18nextLng") || 'en'; // Достъп до localStorage само в браузъра
        setLanguage(storedLang);
        document.title = storedLang ===  'bg' ? 'Професионални умения - инж.Димитров' : 'Professional Skills' +
            ' - eng.Dimitrov';
    }, []);
  return (
    <div className="projects-page">
      <div className="skills-page flex-horizontal-container text-align-center justify-content-end align-items-center">
        <Navigation/>
      </div>
      <SkillPageHtml size={size} />
      <FooterHTML/>
    </div>
  );
};

export default Page;
