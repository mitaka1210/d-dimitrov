"use client";

import React, { useEffect, useRef, useState } from "react";
import "./project.scss";
import { useTranslation } from "react-i18next";
import images from "../../../assets/images/image";
import LoaderHTML from "@/app/loader/LoaderHTML";
const ProjectsHtml = () => {
  const { t } = useTranslation();
  let img = images;

  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Симулираме зареждане (например от API или изображения)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    const storedLang = localStorage.getItem("i18nextLng") || "en"; // Достъп до localStorage само в браузъра
    setLanguage(storedLang);
    document.title =
      storedLang === "bg"
        ? "Моята история -" + " инж.Димитров"
        : "My Timeline - eng.Dimitrov";
  }, []);

  if (loading) {
    return <LoaderHTML />;
  }
  return (
    <div className="flex-vertical-container text-align-center justify-content-center">
      <section className="start-programing flex-item text-align-center">
        <h3>{t("everythingStart")}!</h3>
        <div className="box-wrapper flex-horizontal-container justify-content-center">
          <figure className="shape-box shape-box_half">
            <img src={img[0].url.src} alt="Project Weather App" />
            <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
            <figcaption>
              <div className="show-cont">
                <h3 className="card-no">01</h3>
                <h4 className="card-main-title">Weather App(PWA)</h4>
              </div>
              <h5 className="card-content">{t("weatherApp")}.</h5>
              <h6 className="margin-top-5 border-color-bottom-gray">
                {t("technologies")}
              </h6>
              <ul className="card-content">
                <li>HTML</li>
                <li>SCSS</li>
                <li>JS</li>
                <li>Gulp</li>
                <li>Jekyll</li>
                <li>Figma</li>
              </ul>
              <div className="buttons-wrapper flex-horizontal-container justify-content-end text-align-center align-items-center">
                <a
                  href="https://gracious-goldstine-c11de1.netlify.app/"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("application")}
                </a>
                <a
                  href="https://github.com/mitaka1210/PWA"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("code")}
                </a>
              </div>
            </figcaption>
            <span className="after"></span>
          </figure>
          <figure className="shape-box shape-box_half">
            <img src={img[1].url.src} alt="React-website" />
            <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
            <figcaption>
              <div className="show-cont">
                <h3 className="card-no">02</h3>
                <h4 className="card-main-title">React website</h4>
              </div>
              <h5 className="card-content">{t("reactWebSite")}</h5>
              <h6 className="margin-top-5 border-color-bottom-gray">
                {t("technologies")}
              </h6>
              <ul className="card-content">
                <li>HTML</li>
                <li>SCSS</li>
                <li>JS</li>
                <li>ReactJS</li>
              </ul>
              <div className="buttons-wrapper flex-horizontal-container justify-content-end text-align-center align-items-center">
                <a
                  href="https://keen-volhard-2b8ec9.netlify.app/"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("application")}
                </a>
                <a
                  href="https://github.com/mitaka1210/React-Website-1"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("code")}
                </a>
              </div>
            </figcaption>
            <span className="after"></span>
          </figure>
          <figure className="shape-box shape-box_half">
            <img src={img[2].url.src} alt="React_Todo" />
            <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
            <figcaption>
              <div className="show-cont">
                <h3 className="card-no">03</h3>
                <h4 className="card-main-title">React ToDo</h4>
              </div>
              <h5 className="card-content">{t("reactToDo")}</h5>
              <h6 className="margin-top-5 border-color-bottom-gray">
                {t("technologies")}
              </h6>
              <ul className="card-content">
                <li>HTML</li>
                <li>SCSS</li>
                <li>JS</li>
                <li>ReactJS</li>
              </ul>
              <div className="buttons-wrapper flex-horizontal-container justify-content-end text-align-center align-items-center">
                <a
                  href="https://mitaka1210.github.io/To-Do-App/"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("application")}
                </a>
                <a
                  href="https://github.com/mitaka1210/To-Do-App"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("code")}
                </a>
              </div>
            </figcaption>
            <span className="after"></span>
          </figure>
          <figure className="shape-box shape-box_half">
            <img src={img[3].url.src} alt="React_site" />
            <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
            <figcaption>
              <div className="show-cont">
                <h3 className="card-no">04</h3>
                <h4 className="card-main-title">React website</h4>
              </div>
              <h5 className="card-content">
                Страници с оформление направени с ReactJs and Figma. Адаптивен
                дизайн
              </h5>
              <h4 className="margin-top-5 border-color-bottom-gray">
                {t("technologies")}
              </h4>
              <ul className="card-content">
                <li>HTML</li>
                <li>SCSS</li>
                <li>JS</li>
                <li>ReactJS</li>
              </ul>
              <div className="buttons-wrapper flex-horizontal-container justify-content-end text-align-center align-items-center">
                <a
                  href="https://mitaka1210.github.io/React-website-2/"
                  className="read-more-btn"
                  target="_blank"
                >
                  {t("application")}
                </a>
                <a
                  href="https://github.com/mitaka1210/Portfolio-ENG?tab=readme-ov-file"
                  className="read-more-btn"
                  target="_blank"
                >
                  {t("code")}
                </a>
              </div>
            </figcaption>
            <span className="after"></span>
          </figure>
        </div>
      </section>
      <section className="upgrade-my-self flex-item">
        <h3>{t("evolve")}</h3>
        <div className="box-wrapper flex-horizontal-container justify-content-center">
          <figure className="shape-box shape-box_half">
            <img src={img[4].url.src} alt="Shoes" />
            <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
            <figcaption>
              <div className="show-cont">
                <h3 className="card-no">05</h3>
                <h4 className="card-main-title">
                  {t("shoes")}
                  <span> ({t("shoesHomePage")})</span>
                </h4>
              </div>
              <h5 className="card-content">{t("shopShoes")}</h5>
              <h6 className="margin-top-5 border-color-bottom-gray">
                {t("technologies")}
              </h6>
              <ul className="card-content">
                <li>HTML</li>
                <li>SCSS</li>
                <li>Figma</li>
              </ul>
              <div className="buttons-wrapper flex-horizontal-container justify-content-end text-align-center align-items-center">
                <a
                  href="https://mitaka1210.github.io/landingPages/"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("application")}
                </a>
                <a
                  href="https://github.com/mitaka1210/landingPages"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("code")}
                </a>
              </div>
            </figcaption>
            <span className="after"></span>
          </figure>
          <figure className="shape-box shape-box_half">
            <img src={img[5].url.src} alt="payment" />
            <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
            <figcaption>
              <div className="show-cont">
                <h3 className="card-no">06</h3>
                <h4 className="card-main-title">
                  {t("paymentPage")} (TypeScript)
                </h4>
              </div>
              <h5 className="card-content">{t("paymentPageMake")} TS</h5>
              <h6 className="margin-top-5 border-color-bottom-gray">
                {t("technologies")}
              </h6>
              <ul className="card-content">
                <li>HTML</li>
                <li>SCSS</li>
                <li>JS</li>
                <li>TypeScript</li>
              </ul>
              <div className="buttons-wrapper flex-horizontal-container justify-content-end text-align-center align-items-center">
                <a
                  href="https://mitaka1210.github.io/paymentAppWithTypeScript/"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("application")}
                </a>
                <a
                  href="https://github.com/mitaka1210/paymentAppWithTypeScript"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("code")}
                </a>
              </div>
            </figcaption>
            <span className="after"></span>
          </figure>
          <figure className="shape-box shape-box_half">
            <img src={img[6].url.src} alt="pizza" />
            <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
            <figcaption>
              <div className="show-cont">
                <h3 className="card-no">07</h3>
                <h4 className="card-main-title">{t("pizzaMenu")}</h4>
              </div>
              <h5 className="card-content">{t("pizzaMenu")}</h5>
              <h6 className="margin-top-5 border-color-bottom-gray">
                {t("technologies")}
              </h6>
              <ul className="card-content">
                <li>HTML</li>
                <li>SCSS</li>
                <li>JS</li>
                <li>ReactJS</li>
                <li>Material-UI</li>
                <li>Redux</li>
                <li>Styled-components</li>
              </ul>
              <div className="buttons-wrapper flex-horizontal-container justify-content-end text-align-center align-items-center">
                <a
                  href="https://github.com/mitaka1210/react-pizza"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("code")}
                </a>
              </div>
            </figcaption>
            <span className="after"></span>
          </figure>
          <figure className="shape-box shape-box_half">
            <img
              src="https://images.unsplash.com/photo-1534669740902-e09e38a6a29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
              alt="logo-8"
            />
            <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
            <figcaption>
              <div className="show-cont">
                <h3 className="card-no">08</h3>
                <h4 className="card-main-title">{t("onlineShop")}</h4>
              </div>
              <h5 className="card-content">{t("onlineShopText")}</h5>
              <h6 className="margin-top-5 border-color-bottom-gray">
                {t("technologies")}
              </h6>
              <ul className="card-content">
                <li>HTML</li>
                <li>SCSS</li>
                <li>JS</li>
                <li>ReactJS</li>
              </ul>
              <div className="buttons-wrapper flex-horizontal-container justify-content-end text-align-center align-items-center">
                <a
                  href="https://github.com/mitaka1210/E-shopReactJS"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("code")}
                </a>
              </div>
            </figcaption>
            <span className="after"></span>
          </figure>
        </div>
      </section>
      <section className="my-blog-portfolio flex-vertical-container justify-content-center text-align-center">
        <h3>{t("createMyBlog")}!</h3>
        <div className="box-wrapper">
          <figure className="shape-box shape-box_half">
            <img src={img[8].url.src} alt="React-website" />
            <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
            <figcaption>
              <div className="show-cont">
                <h3 className="card-no">09</h3>
                <h4 className="card-main-title">{t("uploadArticle")}(PERN)</h4>
              </div>
              <h5 className="card-content">{t("myUploader")}</h5>
              <h6 className="margin-top-5 border-color-bottom-gray">
                {t("technologies")}
              </h6>
              <ul className="card-content">
                <li>HTML</li>
                <li>SCSS</li>
                <li>ReactJS</li>
                <li>Redux(RTK)</li>
                <li>Express</li>
                <li>Docker</li>
                <li>DBeaver</li>
                <li>PostgreSQL</li>
              </ul>
              <div className="buttons-wrapper flex-horizontal-container justify-content-end text-align-center align-items-center">
                <a
                  href="https://upload.d-dimitrov.eu/"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("application")}
                </a>
                <a
                  href="https://github.com/mitaka1210/upload_article"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("code")}
                </a>
              </div>
            </figcaption>
            <span className="after"></span>
          </figure>
          <figure className="shape-box shape-box_half">
            <img src={img[15].url.src} alt="React-website" />
            <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
            <figcaption>
              <div className="show-cont">
                <h3 className="card-no">10</h3>
                <h4 className="card-main-title">{t("blog")}</h4>
              </div>
              <h5 className="card-content">{t("myBlog")}</h5>
              <h6 className="margin-top-5 border-color-bottom-gray">
                {t("technologies")}
              </h6>
              <ul className="card-content">
                <li>HTML</li>
                <li>SCSS</li>
                <li>NextJS</li>
                <li>Redux(RTK)</li>
                <li>Figma</li>
              </ul>
              <div className="buttons-wrapper flex-horizontal-container justify-content-end text-align-center align-items-center">
                <a
                  href="https://eng.d-dimitrov.eu/Home-page"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("application")}
                </a>
                <a
                  href="https://github.com/mitaka1210/d-dimitrov"
                  target="_blank"
                  className="read-more-btn"
                >
                  {t("code")}
                </a>
              </div>
            </figcaption>
            <span className="after"></span>
          </figure>
        </div>
      </section>
      <section className="magic-novatio flex-vertical-container justify-content-center text-align-center">
        <h3>{t("iWantMore")}!</h3>
        <div className="box-wrapper">
          <figure className="shape-box shape-box_half">
            <img src={img[18].url.src} alt="React-website" />
            <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
            <figcaption>
              <div className="show-cont">
                <h3 className="card-no">11</h3>
                <h4 className="card-main-title">{t("novatio")}</h4>
              </div>
              <h5 className="card-content">{t("novatioText")}</h5>
              <h6 className="margin-top-5 border-color-bottom-gray">
                {t("technologies")}
              </h6>
              <ul className="card-content">
                <li>HTML</li>
                <li>SCSS</li>
                <li>JS</li>
                <li>Angular</li>
                <li>VueJs</li>
                <li>RxJs</li>
              </ul>
              <div className="buttons-wrapper flex-horizontal-container justify-content-end text-align-center align-items-center">
                <a href="/novatio-Apps" className="read-more-btn">
                  {t("novatioApps")}
                </a>
              </div>
            </figcaption>
            <span className="after"></span>
          </figure>
          <figure className="shape-box shape-box_half">
            <img src={img[19].url.src} alt="React-website" />
            <div className="brk-abs-overlay z-index-0 bg-black opacity-60"></div>
            <figcaption>
              <div className="show-cont">
                <h3 className="card-no">12</h3>
                <h6 className="card-main-title">😏</h6>
              </div>
              <h5 className="card-content">{t("textForNextProject")}</h5>
            </figcaption>
            <span className="after"></span>
          </figure>
        </div>
      </section>
    </div>
  );
};

export default ProjectsHtml;
