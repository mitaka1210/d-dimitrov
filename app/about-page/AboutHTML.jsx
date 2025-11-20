"use client";
import React, {forwardRef, useEffect, useState} from "react";
import {accordianBG} from "../../content-BG";
import {accordianEN} from "../../content-EN";
import withClickOutside from "../Helper-components/Click-outside/WithClickOutSide";
import ScrollTop from "../Helper-components/scrollToTop/scrollTop";
import {useTranslation} from "react-i18next";
import LoaderHTML from "../loader/LoaderHTML";

const AboutHtml = forwardRef(({open, setOpen}, ref) => {
    // property
    // imported from library
    const [active, setActive] = useState(-1);
    const [accordion, setAccordion] = useState(accordianBG);
    const [hideDiv, setHideDiv] = useState(true);
    const {t} = useTranslation();
    const [loading, setLoading] = useState(true);
    // localStorage
    if (typeof window !== 'undefined') {
        let lang = localStorage.getItem('i18nextLng');
        // update data
        useEffect(() => {
            if (lang === "bg") {
                setAccordion(accordianBG);
            } else {
                setAccordion(accordianEN);
            }
        }, [lang]);
    }
    useEffect(() => {
        // Симулираме зареждане (например от API или изображения)
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, []);
    const handleClick = (index) => {
        if (index === active) {
            setActive(-1);
            setHideDiv(true);
        } else {
            setActive(index);
            setHideDiv(false);
        }
    };
    const closeDiv = () => {
        if (!open && !hideDiv) {
            setActive(-1);
            setHideDiv(true);
        }
    };
    if (loading) {
        return <LoaderHTML />;
    }

    return (
        <>
        <div className="about">
            <div
                className="about-me text-align-center flex-horizontal-container-raw justify-content-center align-items-center">
                <h2 className="">{t("aboutMe")}</h2>
            </div>
            <section>

                <div
                    className="my-hobbi flex-vertical-container justify-content-center align-items-center text-align-center margin-15"
                    onClick={closeDiv}>
                    <span className="about-me-text margin-15">{t("whoIam")}</span>
                    <span className="about-me-text">{t("goals")}</span>
                    <ul className=" text-align-justify accordian">
                        {accordion.map((item, index) => {
                            return (
                                <div ref={ref}
                                     className={"list-hobby flex-horizontal-container justify-content-center align-items-center text-align-center click-btn btn-style506" + " " + (index === active ? "add-height-click" : "")}
                                     key={index}>
                                    <li
                                        onClick={() => {
                                            handleClick(index), setOpen(!open);
                                        }
                                        }
                                        className={index === active ? "active" : ""}
                                    >
                                        <div className="accordian-title">{item.title}</div>
                                        <div className="accordian-content">
                                            {item.paras.map((para, num) => {
                                                return <p className="padding-0" key={num}>{para}</p>;
                                            })}
                                            {item.showMore ? <a href="#">{item.showMore}</a> : ""}
                                        </div>
                                    </li>
                                </div>
                            );
                        })}
                    </ul>
                </div>
                <div className="text-align-center maxWidthAndHeight margin-bottom-30 my-motto">
                    <h4>
                        <q>{t("motoOne")}</q>
                    </h4>
                    <hr className="add-line-bottom"/>
                </div>
            </section>
            <div className="text-align-center my-focus"><h3>{t("myFocus")}</h3></div>
            <section className="info-bout-me flex-horizontal-container">
                <div className="box-3">
                    <div className="overlay-box round-behavior shadowed-element border-color-gray-2px">
                        <div
                            className="desc flex-vertical-container-raw justify-content-center align-items-center text-align-center">
                            <h4>{t("programing")}!</h4>
                            <h5><strong>{t("started")}</strong></h5>
                            <span>{t("startedChance") + ' '}<strong>{t('time') + ' '}</strong>{t('thisDirection')}!</span>
                        </div>
                    </div>
                </div>
                <div className="box-1">
                    <div className="overlay-box round-behavior shadowed-element border-color-gray-2px">
                        <div
                            className="desc flex-vertical-container-raw justify-content-center align-items-center text-align-center">
                            <h4 className="">{t("capital")}.</h4>
                            <h4 className="margin-5">{t("say")} <strong>{t("WarrenBuffett")}:</strong></h4>
                            <div className="flex-vertical-container-raw align-items-center text-align-center">
                                <p className="flex-horizontal-container-raw border-color-bottom-gray padding-0">{t("rule")} №1:</p>{t("loseMoney")}.
                                <p className=" border-color-bottom-gray padding-0">{t("rule")} №2:</p>
                                <p>{t('forgetOne')} №1</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-4">
                    <div className="overlay-box round-behavior shadowed-element border-color-gray-2px">
                        <div
                            className="desc flex-vertical-container-raw justify-content-center align-items-center text-align-center">
                            <h4 className="margin-15">{t("book")}</h4>
                            <span>{t("moneyVideo")}.</span>
                            <h5 className="">{t("say")} <strong>{t("RobertKiyosaki")}:</strong></h5>
                            <span><strong className="motivation border-color-bottom-gray ">"{t("motoRobert")}"</strong></span>
                        </div>
                    </div>
                </div>
            </section>
            <ScrollTop/>
        </div>
        </>
    );
});

export default withClickOutside(AboutHtml);
