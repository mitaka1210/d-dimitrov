'use client'

import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import './about.scss';
import SEO from "../SEO/seo";
import { useStoredLanguage } from "../lib/useStoredLanguage";
const AboutHtml = dynamic(
    () => import('./AboutHTML'),
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
const AboutPage = () => {
  const storedLang = useStoredLanguage();
  const [pageUrl, setUrl ] = useState('');
  useEffect(() => {
    document.title = storedLang === 'bg' ? 'За мен - инж.Димитров' : 'About Me' + ' - eng.Dimitrov';
    setUrl (window.location.href != '' ? window.location.href : window.location.origin);
  }, [storedLang]);
  const title = storedLang === 'bg' ? 'За мен - инж.Димитров' : 'About Me- eng.Dimitrov';
  const description = storedLang === 'bg'
      ? "За мен Димитър Димитров."
      : "About Me- eng.Dimitrov";
  return (
    <>     {/* SEO мета тагове */}
      <SEO title={title} description={description} url={pageUrl} lang={storedLang} />
      <main className="images">
        <div>
          <div className="about-page">
            <div
              className="nav-bar-about flex-vertical-container text-align-center justify-content-end ">
              <Navigation/>
            </div>
            <section>
              <main className='about-section'>
                <AboutHtml/>
              </main>
              <footer>
                <FooterHTML/>
              </footer>
            </section>
          </div>
        </div>
      </main>
    </>
  )

};

export default AboutPage;
