'use client'

import "./home.scss";
import React, { useEffect, useState } from "react";
import LoaderHTML from "@/app/loader/LoaderHTML";
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
  const getLocalStorage = localStorage.getItem("i18nextLng");
  console.log('pesho', getLocalStorage);

  useEffect(() => {
    // change meta title on page load
    document.title = getLocalStorage === 'bg' ? 'Начална страница' : 'Home page'

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
  }, [getLocalStorage]); // Празен dependency масив

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