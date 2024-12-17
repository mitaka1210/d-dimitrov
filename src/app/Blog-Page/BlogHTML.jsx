"use client";
import React from "react";
import "./blog.scss";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import useWindowSize from "@/app/Helper-components/getWindowSize/windowSize";
import i18n from "@/i18n";

const BlogHtml = () => {
  const {t} = useTranslation();
  const size = useWindowSize();


  const changeLang = lng => {
    i18n.changeLanguage(lng).then(r => {
    });
  };
  const router = useRouter();
  const redirectTo = (path) => {
    if (path === "aquariums") {
      router.push("/cardAquariums");
    } else if (path === "programing") {
      router.push("/programingArticles");
    }
  };
  return (
    <div className="blog-main-container">
      <div className="min-h-screen bg-white grid place-content-center p-5">
        <h1
          className="capitalize text-3xl md:text-4xl lg:text-6xl text-center mb-10 lg:mb-20 text-indigo-600">{t("category")}</h1>
        <h1
          className="capitalize text-3xl md:text-4xl lg:text-6xl text-center mb-10 lg:mb-20 text-indigo-600">{t("soon")}</h1>
        <div className="grid lg:grid-cols-3 gap-7 justify-center">
          <div className="max-w-sm shadow-xl relative card rounded-md overflow-hidden"
               onClick={() => redirectTo("aquariums")}>
            <div className="relative">
              <img
                src="https://aquascape.bg/blog/12-single-default/akvaskejp-where-the-wild-flowers-grow-aranzhi.jpg"
                alt="" className="max-w-full add-img-height"/>
              <div className="custom-shape-divider-bottom-1635508836">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                     preserveAspectRatio="none">
                  <path
                    d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    className="shape-fill"></path>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 px-4">
              <span className="text-sm text-gray-500 -mb-1 block">37 {t("br")}</span>
              <h2 className="text-xl text-pink-400">{t("aquarium")}</h2>
            </div>
            <div
              className="absolute top-0 right-0 bg-pink-400 cursor-pointe z-50 w-full h-full flex justify-center items-center card-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white cursor-pointer"
                   viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <div className="max-w-sm shadow-xl relative card rounded-md overflow-hidden"
               onClick={() => redirectTo("programing")}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1485856407642-7f9ba0268b51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Wedding" className="max-w-full"/>
              <div className="custom-shape-divider-bottom-1635508836">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                     preserveAspectRatio="none">
                  <path
                    d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    className="shape-fill"></path>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 px-4">
              <span className="text-sm text-gray-500 -mb-1 block">25 {t("br")}</span>
              <h2 className="text-xl text-yellow-400">{t("programing")}</h2>
            </div>
            <div
              className="absolute top-0 right-0 bg-yellow-400 cursor-pointe z-50 w-full h-full flex justify-center items-center card-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white cursor-pointer"
                   viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          {/*//TODO: Add new section*/}
          <div className="max-w-sm shadow-xl relative card rounded-md overflow-hidden">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Funeral" className="max-w-full"/>
              <div className="custom-shape-divider-bottom-1635508836">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                     preserveAspectRatio="none">
                  <path
                    d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    className="shape-fill"></path>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 px-4">
              <span className="text-sm text-gray-500 -mb-1 block">Скоро</span>
              <h2 className="text-xl text-green-700">В момента работя по нея!</h2>
            </div>
            <div
              className="absolute top-0 right-0 bg-green-700 cursor-pointe z-50 w-full h-full flex justify-center items-center card-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white cursor-pointer"
                   viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHtml;
