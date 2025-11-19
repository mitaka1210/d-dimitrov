import React, {useEffect} from "react";
import Link from "next/link";
import Dropdown from "../DropDown/Dropdown";
import images from "../../assets/images/image";
export interface MenuItem {
  title: string;
  route?: string;
  lang?: string;
  children?: MenuItem[];
}

const menuItemsEN: MenuItem[] = [
  {
    title: "Language",
    children: [
      {
        title: "English",
        lang: 'en',
      },
      {
        title: "Bulgarian",
        lang: 'bg',
      },
    ],
  },
];
const menuItemsBG: MenuItem[] = [
  {
    title: "Език",
    children: [
      {
        title: "Английски",
        lang: 'en',
      },
      {
        title: "Български",
        lang: 'bg',
      },
    ],
  },
];

export default function ChangeLang() {
  let lang = localStorage.getItem("i18nextLng");
  let img = images;
  // useEffect(() => {
  // }, [lang]);
  return (
      <div className="flex gap-8 items-center text-white">
        {lang === 'bg' ? menuItemsBG.map((item, number) => {
          return item.hasOwnProperty("children") ? (
              <Dropdown item={item}  key={number}/>
          ) : (
              <Link key={number} className="hover:text-crimson-500" href="#">
                <img
                    src={img[17].url.src}
                    alt="Lang BG"/>
              </Link>
          );
        }) : menuItemsEN.map((item, number) => {
          return item.hasOwnProperty("children") ? (
              <Dropdown item={item}  key={number}/>
          ) : (
              <Link key={number} className="hover:text-crimson-500" href="#">
         ]
                <img
                    src={img[18].url.src}
                    alt="lang EN"/>
              </Link>
          );
        })
        }
      </div>
  );
}