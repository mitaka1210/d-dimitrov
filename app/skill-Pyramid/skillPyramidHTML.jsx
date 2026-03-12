"use client";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {FaCode, FaLaptopCode} from "react-icons/fa";
import "./skillPyramid.scss";
import LoaderHTML from "../loader/LoaderHTML";
import {useTranslation} from "react-i18next";
import MyServices from "../my-services/myServices";

const skills = [
  [{ name: "HTML", icon: "📝", category: "old" }],
  [
    { name: "CSS", icon: "🎨", category: "old" },
    { name: "JavaScript", icon: "⚡", category: "old" },
  ],
  [
    { name: "SCSS", icon: "💅", category: "old" },
    { name: "ReactJS", icon: "⚛️", category: "old" },
    { name: "AngularJS", icon: "🅰️", category: "old" },
  ],
  [
    { name: "Gulp", icon: "🐙", category: "old" },
    { name: "GitHub", icon: "🐱", category: "old" },
    { name: "Angular", icon: "🅰️", category: "old" },
    { name: "NextJS", icon: "🚀", category: "new" },
  ],
  [
    { name: "Redux", icon: "🔄", category: "old" },
    { name: "Express", icon: "🚀", category: "old" },
    { name: "Docker", icon: "🐳", category: "new" },
    { name: "RxJS", icon: "🔗", category: "old" },
    { name: "DBeaver", icon: "🐘", category: "old" },
  ],
  [
    { name: "Postman", icon: "📡", category: "old" },
    { name: "PostgreSQL", icon: "🐘", category: "new" },
    { name: "RTK", icon: "⚙️", category: "old" },
    { name: "Firebase", icon: "🔥", category: "new" },
    { name: "Vue - 2", icon: "🟩", category: "new" },
    { name: "NodeJS", icon: "🛠️", category: "new" },
  ],
  [   {name: "bashScripts", icon: "📜", category: "new" },
      { name: "selfHosted", icon: "🖥️", category: "new" },
      { name: "Мисля какво да е", icon: "🤔💭", category: "new" }
  ]
];

const skillDescriptionsBG = {
  HTML: "Основен език за изграждане на уеб страници.",
  CSS: "Език за стилизиране на уеб страници.",
  JavaScript: "Основен език за уеб разработка.",
  ReactJS: "Библиотека за изграждане на интерфейси.",
  Angular: "Фреймуърк за уеб приложения.",
  NodeJS: "Сървърна среда за изпълнение на JavaScript.",
  Redux: "Управление на състоянието в React.",
  PostgreSQL: "Релационна база данни с отворен код.",
  Docker: "Контейнеризация на приложения.",
  RxJS: "Библиотека за реактивно програмиране.",
  NextJS:
    "Фреймуърк за React с SSR и CSR. Или както аз обичам да го наричам - NextJS е React на стероиди. 😊",
  Express: "Минималистичен бекенд фреймуърк за Node.js.",
  Firebase: "Платформа за бекенд услуги от Google.",
  SCSS: "Разширение на CSS с допълнителни възможности.",
  AngularJS: "Първата версия на Angular за уеб приложения.",
  Gulp: "Инструмент за автоматизация на задачи в уеб разработката.",
  GitHub:
    "GitHub е платформа за хостване на код и сътрудничество, базирана на облак, която позволява на разработчиците да съхраняват, управляват и споделят своите проекти.",
  Postman: "Инструмент за тестване и разработка на API-та.",
  RTK: "Redux Toolkit - подобрена версия на Redux.",
  "Vue - 2": "Втората версия на Vue.js за уеб разработка.",
  DBeaver: "Инструмент за управление на бази данни.",
  bashScripts: "Bash скриптове за автоматизация на задачи в Unix-подобни системи.",
  selfHosted: "Самостоятелно хоствани приложения и услуги.",
  "Мисля какво да е": "Предстои да бъде открито! 😉",
};
const skillDescriptionsEN = {
  HTML: "Basic language for building web pages.",
  CSS: "Language for styling web pages.",
  JavaScript: "Primary language for web development.",
  React: "Library for building interfaces.",
  Angular: "Framework for web applications.",
  "Node.js": "Server environment for running JavaScript.",
  Redux: "State management in React.",
  PostgreSQL: "Open-source relational database.",
  Docker: "Application containerization.",
  RxJS: "Library for reactive programming.",
  NextJS: "Framework for React with SSR and SSG.",
  Express: "Minimalist backend framework for Node.js.",
  Firebase: "Backend services platform by Google.",
  SCSS: "Extension of CSS with additional features.",
  AngularJS: "The first version of Angular for web applications.",
  Gulp: "Task automation tool in web development.",
  GitHub: "GitHub is a cloud-based platform for hosting code and collaboration, allowing developers to store, manage, and share their projects.",
  NestJS: "Framework for building server-side applications with TypeScript.",
  MongoDB: "NoSQL document-based database.",
  Postman: "Tool for API testing and development.",
  RTK: "Redux Toolkit - an improved version of Redux.",
  "Vue - 2": "The second version of Vue.js for web development.",
  dbeaver: "Database management tool.",
  bashScripts: "Bash scripts for automating tasks in Unix-like systems.",
  selfHosted: "Self-hosted applications and services.",
  "🤔💭": "To be discovered! 😉",
};

const services = [
  {
    title: "Web Development",
    icon: <FaCode />,
    details: ["Frontend", "Modern Frameworks", "Responsive Design"],
  },
  {
    title: "App Development",
    icon: <FaLaptopCode />,
    details: ["Cross-platform", "PWA & Native", "Performance Optimization"],
  },
  // {
  //     title: 'Database Management',
  //     icon: <FaDatabase />,
  //     details: ['SQL & NoSQL', 'Optimization', 'Data Security'],
  // },
  // {
  //     title: 'Cloud Solutions',
  //     icon: <FaCloud />,
  //     details: ['Deployment', 'Scalability', 'Serverless Architecture'],
  // },
];

export default function SkillPyramid() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("bg") ? "bg" : "en";
  const [visibleRows, setVisibleRows] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showServices, setShowServices] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Симулираме зареждане (например от API или изображения)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    let reduceInterval;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      // Only update if scroll position has changed significantly
      // if (Math.abs(scrollTop - scrollPos) > 5) {
      //   setScrollPos(scrollTop);
      // }
      const scrolledPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrolledPercentage >= 10 && !hasTriggered) {
        setShowServices(true);
        setHasTriggered(true);
      }

      if (scrollTop === 0) {
        // Плавно намаляване до 1
        clearInterval(reduceInterval);
        reduceInterval = setInterval(() => {
          setVisibleRows((prev) => {
            if (prev > 1) return prev - 1;
            clearInterval(reduceInterval);
            return 1;
          });
        }, 150); // Контролира скоростта на прибиране
      } else {
        clearInterval(reduceInterval);
        if (scrolledPercentage >= 3) {
          setVisibleRows((prev) => (prev < skills.length ? prev + 1 : prev));
        } else if (scrollTop < lastScrollTop) {
          setVisibleRows((prev) => Math.max(prev - 1, 1));
        }
      }

      setLastScrollTop(scrollTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop, hasTriggered]);
  if (loading) {
    return <LoaderHTML />;
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <h2 className="">{t("mySkills")}</h2>

      <div className="flex flex-col items-center">
        {skills.slice(0, visibleRows).map((row, index) => (
          <motion.div
            key={index}
            className="flex gap-1 margin-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          >
            {row.map((skill) => (
              <motion.div
                key={skill.name}
                className={`px-4 py-2 rounded-lg shadow-lg cursor-pointer transition-transform padding-10 ${
                  skill.category === "old" ? "bg-gray-500" : "bg-blue-600"
                }`}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedSkill(skill.name)}
              >
                {skill.icon}
                {skill.name}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
      {selectedSkill && (
        <motion.div
          className="mt-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg w-1/2 text-center relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className="absolute top-2 right-2 bg-red-600 px-3 py-1 rounded-full text-sm padding-10"
            onClick={() => setSelectedSkill(null)}
          >
            {t("close")}
          </button>
          <h2 className="text-lg font-bold">{selectedSkill}</h2>
          <p className="mt-2 text-gray-300">
            {/* {skillDescriptionsBG[selectedSkill]} */}
            {lang === "bg"
              ? skillDescriptionsBG[selectedSkill]
              : skillDescriptionsEN[selectedSkill]}
          </p>
        </motion.div>
      )}
      {/* Services Section */}
      {showServices && (
        <>
          <MyServices />
        </>
      )}
    </div>
  );
}
