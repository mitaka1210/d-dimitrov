"use client";
import React from "react";
import XIcon from "@mui/icons-material/X";
import Image from "next/image";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./footer.scss";
import QR from "../../assets/images/visitQR.png";
import {useTranslation} from "react-i18next";

const FooterHtml = () => {
  const {t} = useTranslation();
  return (
    <footer className="set-footer-bottom">
      <div
        className="footer-container-main flex-horizontal-container justify-content-space-evenly align-items-baseline ">
        <div className="flex-vertical-container justify-content-center margin-5 text-align-justify">
          <div>
            <h4 className="margin-5 color-white text-align-center">{t("contact")}</h4>
          </div>
          <div className="footer-text flex-vertical-container align-items-center">
            <span className="address margin-5 color-white text-align-justify">{t("streetAdd")}</span>
            <span className="phone margin-5 color-white text-align-justify">{t("phone")}: +359 88 49 42 399</span>
            <span className="email margin-5 color-white text-align-justify">{t("email")}: {t("gmail")}</span>
          </div>
        </div>
        <div
          className="flex-vertical-container justify-content-center margin-5">
          <div className="">
            <h4 className=" color-white add-position-relative-social text-align-center">{t("social")}</h4>
          </div>
          <div className="social-network">
            <ul>
              <li>
                <a className="icons-styles margin-10" target="_blank" href="https://www.facebook.com/mitaka1210">
                  <FacebookIcon/>
                </a>
              </li>
              <li>
                <a className="icons-styles  margin-10" target="_blank" href="https://x.com/dimitar1201">
                  <XIcon/>
                </a>
              </li>
              <li>
                <a className="icons-styles  margin-10" target="_blank" href="https://www.linkedin.com/in/dimitar-dimitrov1201/">
                  <LinkedInIcon/>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-vertical-container  justify-content-center align-items-center text-align-center  margin-5">
          <h4 className="margin-5 color-white">{t("visit")}</h4>
          <div className="margin-10">
            <Image
              src={QR}
              width={100}
              height={100}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
      <section>
        <div className="all-rights-reserved flex-horizontal-container-raw text-align-center justify-content-center padding-15">© {t('years')} {t('myName')}. {t('allRights')}.</div>
      </section>
    </footer>
  );
};

export default FooterHtml;
