import React, { useEffect, useState } from "react";
import "./Improvements-website.scss";
import { useTranslation } from "react-i18next";
import LoaderHTML from "../loader/LoaderHTML";
import {accordianBG} from "../../content-BG";
import {accordianEN} from "../../content-EN";

export default function ImprovementsWebsite() {
  const [loading, setLoading] = useState(true);
  const [changeLang, setChangeLang] = useState('bg');
  const { t } = useTranslation();
  // localStorage
  if (typeof window !== 'undefined') {
    let getLang = localStorage.getItem('i18nextLng');
    // update data
    useEffect(() => {
      setChangeLang(getLang)
    }, [getLang]);
  }
  useEffect(() => {
    setLoading(false);
  }, []);
  if (loading) {
    return <LoaderHTML />;
  }
  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div>
          <main className="improvements morphing-bg">
            <br />
            <section>
              <div className="container-improvements ">
                <h2>{t("upcomingTasks")}</h2>
                <div className="update">
                  <span className="icon">⚡</span>
                  <span>{t("optimizePage")}</span>
                  <span className="status in-progress">{t("inProgress")}</span>
                </div>
                <div className="update">
                  <span className="icon">🎨</span>
                  <span>{t("addNewUI")}</span>
                  <span className="status completed">{t("complete")}</span>
                </div>
                <div className="update">
                  <span className="icon">🔍</span>
                  <span>{t("addSearch")}</span>
                  <span className="status pending">{t("expected")}</span>
                </div>
                <div className="update">
                  <span className="icon">👤</span>
                  <span>{t("createLoginPage")}</span>
                  <span className="status in-progress">{t("inProgress")}</span>
                </div>
                <div className="update">
                  <span className="icon">📝</span>
                  <span>{t("publishArticle")}</span>
                  <span className="status completed">{t("complete")}</span>
                </div>
                <div className="update">
                  <span className="icon">🎨</span>
                  <span>{t("addingImprovements")}</span>
                  <span className="status pending">{t("expected")}</span>
                </div>
                <div className="update">
                  <span className="icon">📩</span>
                  <span>{t("contactPageDone")}</span>
                  <span className="status completed">{t("completes")}</span>
                </div>
                <div className="update">
                  <span className="icon">💬</span>
                  <span>{t("addCommentSection")}</span>
                  <span className="status pending">{t("expected")}</span>
                </div>
                <div className="update">
                  <span className="icon">❤️</span>
                  <span>{t("addLikeIdslikeReation")}</span>
                  <span className="status completed">{t("complete")}</span>
                </div>
                <div className="update">
                  <span className="icon">⚙️</span>
                  <span>{t("automateArticleUpload")}</span>
                  <span className="status completed">{t("complete")}</span>
                </div>
                <div className="update">
                  <span className="icon">💡</span>
                  <span>{t("manyMoreIdeas")}</span>
                  <span className="status ideasForWebsite">{t("expected")}</span>
                </div>
              </div>
            </section>
            <h2 className="margin-top-25 color-white">{t("survey")}</h2>
            <section className="survey-section margin-top-15">

              {
                changeLang === "bg" ? (
                    <div>
                      <button className="btn-survey-bulgarian">
                        <a
                            href="https://forms.office.com/r/zkJgyn05mQ?origin=lprLink"
                            target="_blank"
                        >
                          Вашето мнение е от значение!
                        </a>
                      </button>
                    </div>
                ) : (
                    <div>
                      <button className="btn-survey-english">
                        <a
                            href="https://forms.office.com/r/AgvXZZ8s7h?origin=lprLink"
                            target="_blank"
                        >
                          Your opinion matters!
                        </a>
                      </button>
                    </div>
                )
              }
            </section>
          </main>
        </div>
      )}
    </>
  );
}
