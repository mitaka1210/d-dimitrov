"use client";

import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import './cardAquariums.scss';
import CardAquariumsHTML from "./CardAquariumsHTML";
import { useStoredLanguage } from "../lib/useStoredLanguage";

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
    const storedLang = useStoredLanguage();

    useEffect(() => {
        document.title = storedLang === 'bg' ? 'Блог - Димитър Димитров' : 'Blog - Dimitar Dimitrov';
    }, [storedLang]);
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
