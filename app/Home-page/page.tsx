'use client'

import "./home.scss";
import React, {useEffect, useRef, useState} from "react";
import LoaderHTML from "../loader/LoaderHTML";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const HomePageHTML = dynamic(
    () => import('./HomePageHTML'),
    { ssr: false }
);
const Navigation = dynamic(
    () => import('../Navigation-component/navigation'),
    { ssr: false }
);

const HomePage = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [language, setLanguage] = useState('en');
  useEffect(() => {
    // change meta title on page load
    const storedLang  = localStorage.getItem("i18nextLng") || 'en'; // Достъп до localStorage само в браузъра
    setLanguage(storedLang);
    document.title = storedLang ===  'bg' ? 'Начална страница' : 'Home page';
    // Проверка само ако сме в браузърна среда
    if (typeof window !== 'undefined') {
      const nextauth = localStorage.getItem("nextauth.message");

      if (nextauth) {
        setShowMenu(false);
      } else {
        const timer = setTimeout(() => {
          setShowMenu(false);
        }, 3000);

        // Почистване на таймера при размонтиране
        return () => clearTimeout(timer);
      }
    } else {
      // За сървърна среда
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [language]); // Празен dependency масив

  return (
      <>
        {showMenu ? (
            <LoaderHTML />
        ) : (
            <div>
              <div className="nav-bar-home flex-vertical-container text-align-center justify-content-end">
                <Navigation />
              </div>
              <HomePageHTML />
            </div>
        )}
      </>
  );
}

export default HomePage;