import React, {useEffect, useState} from 'react';
import RocketIcon from "@mui/icons-material/Rocket";

const ScrollTop = () => {
  const [show, setShow] = useState(false);



    const ScrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  const controlNavbar = () => {
    if (window.scrollY > 500) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);
  return (
    <div className={`backToTop ${show && 'backTo_Top'}`} onClick={ScrollToTop}>
      <RocketIcon/>
    </div>
  );
};

export default ScrollTop;
