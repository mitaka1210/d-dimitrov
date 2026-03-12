"use client";
import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import './read.scss';
import SEO from "../SEO/seo";
import { useStoredLanguage } from "../lib/useStoredLanguage";

const Page = () => {
    const storedLang = useStoredLanguage();
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
        setUrl (window.location.href != '' ? window.location.href : window.location.origin);
    }, []);
    const title = storedLang === 'bg' ? 'Статия' : 'Article';
    const description = storedLang === 'bg' ? "Статия за старт на аквариум" : "Article for start of aquarium";
  return (
      <>
      <SEO title={title} description={description} url={pageUrl} lang={storedLang} />

    <div>
      <Navigation/>
      <ReadHtml/>
      <FooterHTML/>
    </div>
    </>
  );
};

export default Page;
