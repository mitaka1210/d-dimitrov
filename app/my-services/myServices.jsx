import React, { useState, useEffect } from "react";
import "./myServices.scss";
import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaDatabase, FaCloud } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import images from "../../assets/images/image";
console.log(images);
const servicesBG = [
  {
    title: "Уеб Разработка",
    icon: <FaCode />,
    details: [
      "Създаване на отзивчиви и удобни за потребителя уебсайтове с помощта на модерни технологии",
    ],
  },
  {
    title: "Софтуерни Консултации",
    icon: (
      <img
        src={images[23].url.src}
        alt="Software Consulting"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    details: [
      "Предоставяне на експертни насоки и решения за софтуерни проекти.",
    ],
  },
  {
    title: "Продуктов Дизайн",
    icon: <FaLaptopCode />,
    details: [
      "Имам опит във всички аспекти на продуктовия дизайн за клиенти и бизнес клиенти, от идеята до макета и изготвянето.",
    ],
  },
  // {
  //     title: 'Облачни Решения',
  //     icon: <FaCloud />,
  //     details: ['Деплоймънт', 'Скалируемост', 'Сървърлес Архитектура'],
  // },
];
const servicesEN = [
  {
    title: "Web Development",
    icon: <FaCode />,
    details: [
      "Creating responsive and user-friendly websites using modern technologies",
    ],
  },
  {
    title: "Software Consulting",
    icon: (
      <img
        src={images[23].url.src}
        alt="Software Consulting"
        style={{ width: "50px", height: "50px" }}
      />
    ),
    details: [
      "Providing expert guidance and solutions for software development projects.",
    ],
  },
  {
    title: "Product Design",
    icon: <FaDatabase />,
    details: [
      "I have a wealth of experience in all aspects of product design for clients and business clients, from ideation to prototyping to production.",
    ],
  },
  // {
  //     title: 'Cloud Solutions',
  //     icon: <FaCloud />,
  //     details: ['Deployment', 'Scalability', 'Serverless Architecture'],
  // },
];
export default function MyServices() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "bg");

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setLang(lng);
    };
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);
  return (
    <div className="margin-top-45">
      {/* <h2 className="margin-top-45 remove-margin-bottom">
            {t("myServices")}
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 services">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-16 rounded-xl shadow-lg text-center flex flex-col items-center card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              >
                <div className="text-4xl mb-4 text-blue-400">
                  {service.icon}
                </div>
                <h2 className="text-xl font-bold mb-2">{service.title}</h2>
                <ul className="text-gray-400">
                  {service.details.map((detail, i) => (
                    <li key={i} className="mb-1 change-font-size-li">
                      &raquo; {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div> */}
      <section className="expertise">
        <h2 className="text-align-center">{t("myAreasExpertise")}</h2>
        <p className="intro-text text-align-center">
          {t("myAreasExpertiseDescription")}
        </p>

        <div className="expertise-grid">
          {lang === "en"
            ? servicesEN.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 p-16 rounded-xl shadow-lg text-center flex flex-col items-center card-services"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                >
                  <div className="text-4xl mb-4 text-blue-400">
                    {service.icon}
                  </div>
                  <h2 className="text-xl font-bold mb-4">{service.title}</h2>
                  <ul className="text-gray-400">
                    {service.details.map((detail, i) => (
                      <li key={i} className="mb-1 change-font-size-li">
                        &raquo; {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))
            : servicesBG.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 p-16 rounded-xl shadow-lg text-center flex flex-col items-center  card-services"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                >
                  <div className="text-4xl mb-4 text-blue-400">
                    {service.icon}
                  </div>
                  <h2 className="text-xl font-bold mb-2 color-white">
                    {service.title}
                  </h2>
                  <ul className="text-gray-400">
                    {service.details.map((detail, i) => (
                      <li key={i} className="mb-1 change-font-size-li">
                        &raquo; {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

          {/* <div className="expertise-card">
            <h3>Software Consulting</h3>
            <ul className="tech-list">
              <li>
                Providing expert guidance and solutions for software development
                projects.
              </li>
            </ul>
          </div> */}

          {/* <div className="expertise-card">
      <h3>Mobile App Development</h3>
      <ul className="tech-list">
        <li>React Native</li>
        <li>Flutter</li>
        <li>WeChat Mini App</li>
      </ul>
    </div> */}

          {/* <div className="expertise-card">
            <h3>Product Design</h3>
            <p className="service-description">
              I have a wealth of experience in all aspects of product design for
              clients and business clients, from ideation to prototyping to
              production.
            </p>
          </div> */}
        </div>
      </section>

      <section className="process">
        <h2 className="text-align-center">{t("collaborationProcess")}</h2>

        <div className="process-steps">
          <div className="process-step">
            <div className="process-content">
              <h4>{t("communication")}</h4>
              <p>{t("consultation")}</p>
            </div>
          </div>

          <div className="process-step">
            <div className="process-content">
              <h4>{t("designDevelopmentHeader")}</h4>
              <p>{t("designDevelopment")}</p>
            </div>
          </div>

          <div className="process-step">
            <div className="process-content">
              <h4>{t("revisionHeader")}</h4>
              <p>{t("revision")}</p>
            </div>
          </div>

          <div className="process-step">
            <div className="process-content">
              <h4>{t("finalizeHeader")}</h4>
              <p>{t("finalize")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
