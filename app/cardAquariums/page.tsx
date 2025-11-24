"use client";

import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import './cardAquariums.scss';
import CardAquariumsHTML from "./CardAquariumsHTML";

const CardAquariumsHtml = dynamic(
    () => import('./CardAquariumsHTML'),
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
        document.title = storedLang ===  'bg' ? 'Блог - Димитър Димитров' : 'Blog - Dimitar Dimitrov';
    }, []);
  return (
    <div>
      <Navigation/>
      <CardAquariumsHTML/>
      <div className="input-width-100">
        <FooterHTML/>
      </div>
    </div>
  );
};

export default Page;
