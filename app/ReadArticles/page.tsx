"use client";
import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import './read.scss';
import SEO from "../SEO/seo";

const Page = () => {
    const [language, setLanguage] = useState('en');
    const [pageUrl, setUrl ] = useState('');

    const ReadHtml = dynamic(
    () => import('./ReadHTML'),
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
    useEffect(() => {
        const storedLang  = localStorage.getItem("i18nextLng") || 'en'; // Достъп до localStorage само в браузъра
        setLanguage(storedLang);
        setUrl (window.location.href != '' ? window.location.href : window.location.origin);

    }, []);
    const title = language === 'bg' ? 'Статия' : 'Article';
    const description = language === 'bg' ? "Статия за старт на аквариум" : "Article for start of aquarium";
  return (
      <>
      <SEO title={title} description={description} url={pageUrl} lang={language} />

    <div>
      <Navigation/>
      <ReadHtml/>
      <FooterHTML/>
    </div>
    </>
  );
};

export default Page;
