import React, {useState} from "react";
import "./dislike.scss";

const DisLikeheart = () => {
  const [active, setActive] = useState(false); // Създаване на състояние
  const handleClick = () => {
    setActive(!active); // Промяна на състоянието при кли
  };
  return (
      <div className="heart-Circle" onClick={handleClick} >

        <div className={active ? "heart-Container broken" : "heart-Container"}>

          <div className="left-Side sides">

            <div className="half">
              <div className="heart"></div>
            </div>

            <div className="points">
              <div className="point pt1"></div>
              <div className="point pt4"></div>
              <div className="point pt2"></div>
              <div className="point pt3"></div>
            </div>

          </div>
          <div className="right-Side sides">

            <div className="half">
              <div className="heart"></div>
            </div>

            <div className="points">
              <div className="point pt1"></div>
              <div className="point pt2"></div>
              <div className="point pt3"></div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DisLikeheart;
