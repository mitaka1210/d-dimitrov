'use client'

import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
const TimeLineHtml = dynamic(
    () => import('./TimeLineHTML'),
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
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const storedLang  = localStorage.getItem("i18nextLng") || 'en'; // Достъп до localStorage само в браузъра
        setLanguage(storedLang);
        document.title = storedLang ===  'bg' ? 'Историята ми! - инж.Димитров' : 'Professional Skills' +
            ' - eng.Dimitrov';
    }, []);
  return (
    <div className="timeline-page">
      <div className="timeline-nav flex-horizontal-container text-align-center justify-content-end align-items-center">
        <Navigation/>
      </div>
      <TimeLineHtml/>
      <FooterHTML/>
    </div>
  )
    ;
};

export default Page;
