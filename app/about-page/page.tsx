'use client'

import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import './about.scss';
import SEO from "../SEO/seo";
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
  const [language, setLanguage] = useState('en');
  const [pageUrl, setUrl ] = useState('');
  useEffect(() => {
    const storedLang  = localStorage.getItem("i18nextLng") || 'en'; // Достъп до localStorage само в браузъра
    setLanguage(storedLang);
    document.title = storedLang ===  'bg' ? 'За мен - инж.Димитров' : 'About Me' +
        ' - eng.Dimitrov';
    setUrl (window.location.href != '' ? window.location.href : window.location.origin);

  }, []);
  const title = language === 'bg' ? 'За мен - инж.Димитров' : 'About Me- eng.Dimitrov';
  const description = language === 'bg'
      ? "За мен Димитър Димитров."
      : "About Me- eng.Dimitrov";
  return (
    <>     {/* SEO мета тагове */}
      <SEO title={title} description={description} url={pageUrl} lang={language} />
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
