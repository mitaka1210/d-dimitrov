'use client'

import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import { useStoredLanguage } from "../lib/useStoredLanguage";
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
    const storedLang = useStoredLanguage();

    useEffect(() => {
        document.title = storedLang === 'bg' ? 'Историята ми! - инж.Димитров' : 'Professional Skills' + ' - eng.Dimitrov';
    }, [storedLang]);
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
