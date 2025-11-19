import React, {useEffect, useState} from "react";
import './novatioApps.scss';
import images from "../../assets/images/image";
import {useTranslation} from "react-i18next";
import LoaderHTML from "../loader/LoaderHTML";

function NovatioApps(props) {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(true);
    let img = images;
    useEffect(() => {
        // Симулираме зареждане (например от API или изображения)
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, []);

    if (loading) {
        return <LoaderHTML />;
    }
    return (
            <main className="novatio-apps flex-vertical-container align-items-center">
                <section className="novatioApps margin-40">
                    <h2>Novatio</h2>
                </section>
                <section>
                    <div className="container-novatio-app flex-horizontal-container align-items-center justify-content-center">
                        <div className="flex-horizontal-container mobile-novatio-apps">
                            <div className="card margin-15">
                                <div className="img-box">
                                    <img src={img[12].url.src} alt="dispatcher"/>
                                </div>
                                <div className="content flex-vertical-container align-items-center">
                                    <h2>Dispatcher</h2>
                                    <h2>{t("technologies")}:</h2>
                                    <span>VueJS 2</span>
                                    <span>RxJS</span>
                                    <span>Vuetify theme</span>
                                </div>
                            </div>
                            <div className="card margin-15" >
                                <div className="img-box">
                                    <img src={img[13].url.src} alt="reception"/>
                                </div>
                                <div className="content  flex-vertical-container align-items-center">
                                    <h2>Reception</h2>
                                    <h2>{t("technologies")}:</h2>
                                    <span>VueJS 2</span>
                                    <span>RxJS</span>
                                    <span>Vuetify theme</span>
                                </div>
                            </div>
                            <div className="card margin-15" >
                                <div className="img-box">
                                    <img src={img[9].url.src} alt="warehouse"/>
                                </div>
                                <div className="content  flex-vertical-container align-items-center">
                                    <h2>Warehouse (PWA)</h2>
                                    <h2>{t("technologies")}:</h2>
                                    <span>Angular</span>
                                    <span>RxJS</span>
                                    <span>Angular Material</span>
                                    <span>MTG-Material Theme Generator</span>
                                </div>
                            </div>
                            <div className="card margin-15" >
                                <div className="img-box">
                                    <img src={img[14].url.src} alt="customer"/>
                                </div>
                                <div className="content  flex-vertical-container align-items-center">
                                    <h2>Customer</h2>
                                    <h2>{t("technologies")}:</h2>
                                    <span>VueJS 2</span>
                                    <span>RxJS</span>
                                    <span>Vuetify theme</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-horizontal-container">
                            <div className="card margin-15">
                                <div className="img-box">
                                    <img src={img[11].url.src} alt="driver"/>
                                </div>
                                <div className="content  flex-vertical-container align-items-center">
                                    <h2>Driver</h2>
                                    <h2>{t("technologies")}:</h2>
                                    <span>Angular</span>
                                    <span>RxJS</span>
                                    <span>Angular Material</span>
                                    <span>MTG-Material Theme Generator</span>
                                </div>
                            </div>
                            <div className="card margin-15" >
                                <div className="img-box">
                                    <img src={img[10].url.src} alt="client"/>
                                </div>
                                <div className="content  flex-vertical-container align-items-center">
                                    <h2>Client</h2>
                                    <h2>{t("technologies")}:</h2>
                                    <span>VueJS 2</span>
                                    <span>RxJS</span>
                                    <span>Vuetify theme</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div>
                    <button className="custom-btn btn-6 input-width-100">
                        <a href="https://novatiospace.com/" target="_blank">Novatio екосистема</a>
                    </button>
                </div>
            </main>
    );
}

export default NovatioApps;