'use client'

import React, {useState} from 'react'
import Link from 'next/link';
import './dropdown.scss';
import {translateWebsite} from "./test";
import useWindowSize from "../Helper-components/getWindowSize/windowSize";
import Image from "next/image";
import US from "../../assets/images/united-states.png";
import BG from "../../assets/images/bulgaria.png";
export default function Dropdown(props: any) {
  //?need to import library
  const size = useWindowSize();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //? my variables
  const {item} = props;
  const flagBG = '🇧🇬'
  const flagEN= '🇺🇸'
  const menuItems = item.children;
  const toggle = () => {
    setIsOpen(old => !old);
  }
  const multiMethod = () => {
    toggle();
  }
  const transClass = isOpen ? "flex" : "hidden";

  //TODO може би ще е по-добре да показвам флаговете вместо текста на езика в момента пише EN or BG и езика  когато сме на екран повече от 630
  return (
    <>
      {size.width < 630 ?
        <div className='flex-horizontal-container-raw width-100 justify-content-center margin-5 gap-15'>
          <button onClick={() => {
            toggle();
            translateWebsite("English")
          }}>
            <Image src={US} alt="US"/>
          </button>
          <button onClick={() => {
            toggle();
            translateWebsite("Bulgarian")
          }}>
            <Image src={BG} alt="BG"/>
          </button>
        </div> :
        <div>
          <div className="relative">
            <button
              className="add-hover-color"
              onClick={() => multiMethod()}
            >{item.title}
            </button>
            <div
              className={`absolute right-14 top-8 z-30 w-[250px] min-h-[300px] flex flex-col py-4 bg-zinc-400 rounded-md ${transClass}`}>
              {
                menuItems.map((item:any, number:any) =>
               <div key={number}>
                 <Link
                     className="hover:bg-zinc-300 hover:text-zinc-500 px-4 py-1 lang-flag"
                     href={item?.route || ''}
                     onClick={() => {
                       multiMethod();
                       translateWebsite(item)
                     }}
                 >{item.lang === 'bg' ? flagBG : flagEN} {item.title}
                 </Link>
               </div>
                )
              }
            </div>
          </div>
          {
            isOpen
              ?
              <div
                className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/40"
                onClick={toggle}
              ></div>
              :
              <></>
          }
        </div>
      }
    </>
  )
}
