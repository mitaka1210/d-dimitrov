import React from "react";
import "./mobile.scss";
import Slider from "react-slick";
import MyServices from "../my-services/myServices";
import { FaCode, FaLaptopCode } from "react-icons/fa";
const MobileSkillsHtml = () => {
  const imgs = [
    "html",
    "css",
    "docker",
    "grunt",
    "reactjs",
    "angular",
    "angularjs",
    "scss",
    "reactjs",
    "postman",
    "redux(RTK)",
    "dbeaver",
    "postgreSQL",
    "github",
    "express",
    "javascript",
    "nodejs",
    "jekyll",
    "rxjs",
  ];
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
  const settings = {
    centerMode: true,
    className: "slider variable-width, center",
    centerPadding: "10px",
    slidesToShow: 0,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    variableWidth: true,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  const renderSlides = imgs.map((num) => (
    <div className="trending-img card" key={num} style={{ width: 350 }}>
      {num}
    </div>
  ));
  return (
    <>
      <div className="cards-preview">
        <Slider {...settings}>{renderSlides}</Slider>
        <section className="my-services-section-mobile">
          <MyServices />
        </section>
        {/* <h2 className="text-align-center">Моите Услуги</h2>
          <div
              className="mt-6 margin-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 services">
            {services.map((service, index) => (
                <motion.div
                    key={index}
                    className="bg-gray-800 p-16 rounded-xl shadow-lg text-center flex flex-col items-center card"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{ duration: 0.5, delay: index * 0.2, ease: "easeOut" }}
                >
                  <div className="text-4xl mb-4 text-blue-400">{service.icon}</div>
                  <h2 className="text-xl font-bold mb-2">{service.title}</h2>
                  <ul className="text-gray-400 services-li-font-size">
                    {service.details.map((detail, i) => (
                        <li key={i} className="mb-1">&raquo; {detail}</li>
                    ))}
                  </ul>
                </motion.div>
            ))}
          </div> */}
      </div>
    </>
  );
};

export default MobileSkillsHtml;
