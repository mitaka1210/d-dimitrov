"use client";

// components/Nav.js
import Link from "next/link";
import "./nav.scss";
import { useTranslation } from "react-i18next";
import HamburgerMenu from "@/app/HamburgerMenu-page/HamburgerMenuHTML";
import useWindowSize from "@/app/Helper-components/getWindowSize/windowSize";
import React, { useEffect, useState } from "react";
import Header from "@/app/Lang/Lang";
import ChangeLang from "@/app/Lang/Lang";
import { useRouter } from "next/navigation";
import Appbar from "@/app/SignInButton/AppBar/AppBar";
import { signOut, useSession } from "next-auth/react";
import UserDropdown from "@/app/UserDropdown/userDropdown";
const Navigation = () => {
  const { t } = useTranslation();
  const size = useWindowSize();
  const { data: session } = useSession();
  const [userName, setUserName] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (session && session.user) {
      setUserName(session.user.name);
    }else if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null && localStorage.getItem('token') !== ''){
      setUserName(localStorage.getItem('name'));
    }
  }, [userName]);
  const ImprovementsWebsite = () => {
    router.push("/Improvements-website");
  };
  return (
    <header className="maxWidthAndHeight flex-horizontal-container justify-content-end text-align-center">
      {/*!If we need to check screen size START*/}
      {/*<div className='color-white addP'>*/}
      {/*  {size.width}px / {size.height}px*/}
      {/*</div>*/}
      {/*!If we need to check screen size END*/}
      {size.width < 501 ? (
        <div>
          <HamburgerMenu />
        </div>
      ) : (
        <div className="maxWidthAndHeight justify-content-end flex-horizontal-container">
          <div
            className="rocket-bgr-improvements"
            onClick={ImprovementsWebsite}
          >
            <span>🚀</span>
          </div>
          <ul className="justify-content-end maxWidthAndHeight navigation padding-0">
            <li className="text-1 color-white margin-15">
              <Link href="/">{t("home")}</Link>
            </li>
            <li className="text-2 color-white margin-15">
              <Link href="/about-page">{t("about")}</Link>
            </li>
            <li className="text-3 color-white margin-15">
              <Link href="/Blog-Page">{t("blog")}</Link>
            </li>
            <li className="text-4 color-white margin-15">
              <Link href="/Projects-page">{t("project")}</Link>
            </li>
            <li className="text-5 color-white margin-15">
              <Link href="/Skills-page">{t("skills")}</Link>
            </li>
            <li className="text-6 color-white margin-15">
              <Link href="/Timeline-page">{t("timeLine")}</Link>
            </li>
            <li className="text-7 color-white margin-15">
              <Link href="/Contacts-page">{t("contact")}</Link>
            </li>
{/*            <li className={userName === '' ? 'margin-15 text-8 color-white' : 'margin-5 text-8 color-white'}>
              {
                userName === ''  ?  <Link href="/Login-page">{t("login")}</Link> :
                    <UserDropdown userLoginName={userName} />
              }
            </li>*/}
            <li className="text-9 color-white margin-15">
              <ChangeLang />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navigation;
